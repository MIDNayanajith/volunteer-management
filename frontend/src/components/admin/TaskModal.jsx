import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const TaskModal = ({ show, onClose, onTaskSaved, taskToEdit }) => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    status: "new",
    priority: "medium",
    due_date: "",
    event_id: "",
    assigned_to: "",
  });
  const [events, setEvents] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  // Fetch events and volunteers when modal opens
  useEffect(() => {
    if (show) {
      fetchData();

      // If editing, prefill the form
      if (taskToEdit) {
        setFormData({
          title: taskToEdit.title,
          status: taskToEdit.status,
          priority: taskToEdit.priority,
          due_date: taskToEdit.due_date.split("T")[0],
          event_id: taskToEdit.event_id || "",
          assigned_to: taskToEdit.assigned_to || "",
        });
      } else {
        // Reset form for new task
        setFormData({
          title: "",
          status: "new",
          priority: "medium",
          due_date: "",
          event_id: "",
          assigned_to: "",
        });
      }
    }
  }, [show, taskToEdit]);

  const fetchData = async () => {
    try {
      setFetching(true);
      setErrors({});

      // Fetch events
      const eventsResponse = await axios.get(
        "http://localhost:8000/api/admin/getEvents",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEvents(eventsResponse.data.data || []);

      // Fetch volunteers
      const volunteersResponse = await axios.get(
        "http://localhost:8000/api/admin/getVolunteers",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setVolunteers(volunteersResponse.data.data || []);
    } catch (error) {
      console.error("Fetch error:", error);
      setErrors({
        submit: "Failed to load data. Please try again.",
      });
    } finally {
      setFetching(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateTask = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.due_date) {
      newErrors.due_date = "Due date is required";
    }

    return newErrors;
  };

  const handleSubmitTask = async () => {
    const validationErrors = validateTask();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      setErrors({});

      let response;

      if (taskToEdit) {
        // Update existing task
        response = await axios.put(
          `http://localhost:8000/api/admin/updateTask/${taskToEdit.id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // Create new task
        response = await axios.post(
          "http://localhost:8000/api/admin/createTask",
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      if (response.data.status === 200) {
        onTaskSaved(response.data.task);
        onClose();
      }
    } catch (error) {
      console.error("Task operation error:", error);
      if (error.response?.data?.message) {
        setErrors({ submit: error.response.data.message });
      } else if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({
          submit: `Failed to ${
            taskToEdit ? "update" : "create"
          } task. Please try again.`,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">
              {taskToEdit ? "Edit Task" : "Create New Task"}
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            {errors.submit && (
              <div className="alert alert-danger">{errors.submit}</div>
            )}

            <div className="mb-3">
              <label className="form-label">Task Title *</label>
              <input
                type="text"
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter task title"
              />
              {errors.title && (
                <div className="invalid-feedback">{errors.title}</div>
              )}
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="new">New</option>
                  <option value="processing">Processing</option>
                  <option value="complete">Complete</option>
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Priority</label>
                <select
                  className="form-select"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Due Date *</label>
              <input
                type="date"
                className={`form-control ${
                  errors.due_date ? "is-invalid" : ""
                }`}
                name="due_date"
                value={formData.due_date}
                onChange={handleInputChange}
                min={new Date().toISOString().split("T")[0]}
              />
              {errors.due_date && (
                <div className="invalid-feedback">{errors.due_date}</div>
              )}
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Event (Optional)</label>
                <select
                  className="form-select"
                  name="event_id"
                  value={formData.event_id}
                  onChange={handleInputChange}
                  disabled={fetching}
                >
                  <option value="">Select Event</option>
                  {events.map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.name}
                    </option>
                  ))}
                </select>
                {fetching && (
                  <div className="mt-1 text-muted small">Loading events...</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Assign To (Optional)</label>
                <select
                  className="form-select"
                  name="assigned_to"
                  value={formData.assigned_to}
                  onChange={handleInputChange}
                  disabled={fetching}
                >
                  <option value="">Select Volunteer</option>
                  {volunteers.map((volunteer) => (
                    <option key={volunteer.id} value={volunteer.id}>
                      {volunteer.name}
                    </option>
                  ))}
                </select>
                {fetching && (
                  <div className="mt-1 text-muted small">
                    Loading volunteers...
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmitTask}
              disabled={loading || fetching}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  {taskToEdit ? "Updating..." : "Creating..."}
                </>
              ) : taskToEdit ? (
                "Update Task"
              ) : (
                "Create Task"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
