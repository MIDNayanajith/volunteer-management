// src/components/admin/EventModal.js
import React, { useState, useEffect } from "react";

const EventModal = ({ show, onClose, onSubmit, event }) => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    location: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (event) {
      setFormData({
        name: event.name,
        date: event.date.split("T")[0], // Format date for input[type="date"]
        location: event.location,
        description: event.description,
      });
    } else {
      setFormData({
        name: "",
        date: "",
        location: "",
        description: "",
      });
    }
    setErrors({});
  }, [event, show]);

  const handleChange = (e) => {
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

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";

    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const eventData = {
      ...formData,
      ...(event && { id: event.id }),
    };

    onSubmit(eventData);
  };

  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">
              {event ? "Edit Event" : "Create New Event"}
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Event Name *</label>
              <input
                type="text"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Event name"
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Date *</label>
                <input
                  type="date"
                  className={`form-control ${errors.date ? "is-invalid" : ""}`}
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                />
                {errors.date && (
                  <div className="invalid-feedback">{errors.date}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Location *</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.location ? "is-invalid" : ""
                  }`}
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Event location"
                />
                {errors.location && (
                  <div className="invalid-feedback">{errors.location}</div>
                )}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Description *</label>
              <textarea
                className={`form-control ${
                  errors.description ? "is-invalid" : ""
                }`}
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Event description"
              ></textarea>
              {errors.description && (
                <div className="invalid-feedback">{errors.description}</div>
              )}
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              {event ? "Update Event" : "Create Event"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
