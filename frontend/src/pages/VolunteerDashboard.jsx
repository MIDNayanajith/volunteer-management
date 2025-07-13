import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const VolunteerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("tasks");
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(5);
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    averageRating: 0,
  });

  // Mock data - replace with actual API calls
  const mockTasks = [
    {
      id: 1,
      title: "Setup Registration Booth",
      priority: "high",
      status: "new",
      dueDate: "2024-02-15",
      event: "Community Cleanup",
      description: "Set up registration booth and welcome volunteers",
    },
    {
      id: 2,
      title: "Distribute Supplies",
      priority: "medium",
      status: "in-progress",
      dueDate: "2024-02-16",
      event: "Food Drive",
      description: "Organize and distribute food packages to participants",
    },
    {
      id: 3,
      title: "Clean Up Area",
      priority: "low",
      status: "completed",
      dueDate: "2024-02-10",
      event: "Beach Cleanup",
      description: "Collect trash and recyclables from designated area",
    },
    {
      id: 4,
      title: "Assist Elderly Visitors",
      priority: "high",
      status: "new",
      dueDate: "2024-02-18",
      event: "Community Center",
      description: "Help elderly visitors navigate the facility",
    },
  ];

  const mockEvents = [
    {
      id: 1,
      name: "Community Cleanup",
      date: "2024-02-15",
      time: "09:00 AM - 12:00 PM",
      location: "Central Park",
      status: "Active",
      tasksAssigned: 3,
      tasksCompleted: 1,
    },
    {
      id: 2,
      name: "Food Drive",
      date: "2024-02-20",
      time: "10:00 AM - 02:00 PM",
      location: "Community Center",
      status: "Upcoming",
      tasksAssigned: 2,
      tasksCompleted: 0,
    },
    {
      id: 3,
      name: "Blood Donation",
      date: "2024-02-25",
      time: "08:00 AM - 04:00 PM",
      location: "City Hospital",
      status: "Upcoming",
      tasksAssigned: 1,
      tasksCompleted: 0,
    },
  ];

  const mockProfile = {
    name: "Jane Volunteer",
    email: "jane@example.com",
    phone: "+1 (555) 123-4567",
    skills: ["First Aid", "Event Planning", "Communication"],
    availability: "Weekends",
    joined: "2023-01-15",
    hoursVolunteered: 42,
  };

  useEffect(() => {
    // Calculate stats from mock data
    setStats({
      totalTasks: mockTasks.length,
      completedTasks: mockTasks.filter((task) => task.status === "completed")
        .length,
      pendingTasks: mockTasks.filter((task) => task.status !== "completed")
        .length,
      averageRating: 4.7,
    });
  }, []);

  const getPriorityBadge = (priority) => {
    const badges = {
      high: "badge bg-danger",
      medium: "badge bg-warning",
      low: "badge bg-success",
    };
    return badges[priority] || "badge bg-secondary";
  };

  const getStatusBadge = (status) => {
    const badges = {
      new: "badge bg-info",
      "in-progress": "badge bg-warning",
      completed: "badge bg-success",
    };
    return badges[status] || "badge bg-secondary";
  };

  const handleTaskAction = (task, action) => {
    if (action === "complete") {
      setSelectedTask(task);
      setShowFeedbackModal(true);
    }
  };

  const submitFeedback = () => {
    console.log(`Feedback for task ${selectedTask.id}:`, { rating, feedback });
    setShowFeedbackModal(false);
    setFeedback("");
    setRating(5);
    // Here you would make an API call to update the task status
  };

  const renderTasks = () => (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">Your Tasks</h5>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Task</th>
                <th>Event</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockTasks.map((task) => (
                <tr key={task.id}>
                  <td>
                    <div className="fw-bold">{task.title}</div>
                    <small className="text-muted">{task.description}</small>
                  </td>
                  <td>{task.event}</td>
                  <td>
                    <span className={getPriorityBadge(task.priority)}>
                      {task.priority}
                    </span>
                  </td>
                  <td>
                    <span className={getStatusBadge(task.status)}>
                      {task.status}
                    </span>
                  </td>
                  <td>{task.dueDate}</td>
                  <td>
                    {task.status !== "completed" && (
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => handleTaskAction(task, "complete")}
                      >
                        <i className="fas fa-check me-1"></i>Complete
                      </button>
                    )}
                    {task.status === "completed" && (
                      <span className="text-success">
                        <i className="fas fa-check-circle me-1"></i>Completed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderEvents = () => (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">Your Events</h5>
      </div>
      <div className="card-body">
        <div className="row g-4">
          {mockEvents.map((event) => (
            <div key={event.id} className="col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 className="card-title">{event.name}</h6>
                      <p className="card-text mb-1">
                        <i className="fas fa-calendar me-2 text-primary"></i>
                        {event.date} | {event.time}
                      </p>
                      <p className="card-text mb-1">
                        <i className="fas fa-map-marker-alt me-2 text-primary"></i>
                        {event.location}
                      </p>
                      <p className="card-text mb-0">
                        <i className="fas fa-tasks me-2 text-primary"></i>
                        {event.tasksCompleted}/{event.tasksAssigned} tasks
                        completed
                      </p>
                    </div>
                    <span className="badge bg-primary">{event.status}</span>
                  </div>
                </div>
                <div className="card-footer bg-transparent">
                  <button className="btn btn-sm btn-outline-primary">
                    <i className="fas fa-info-circle me-1"></i> View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">Your Profile</h5>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-4 text-center">
            <div
              className="bg-light rounded-circle p-4 mb-3 mx-auto"
              style={{ width: "150px", height: "150px" }}
            >
              <i className="fas fa-user fa-4x text-primary"></i>
            </div>
            <h5>{mockProfile.name}</h5>
            <p className="text-muted">Volunteer</p>
            <button className="btn btn-outline-primary btn-sm">
              <i className="fas fa-edit me-1"></i> Edit Profile
            </button>
          </div>

          <div className="col-md-8">
            <div className="row mb-3">
              <div className="col-md-6">
                <h6>Contact Information</h6>
                <p>
                  <i className="fas fa-envelope me-2 text-muted"></i>
                  {mockProfile.email}
                </p>
                <p>
                  <i className="fas fa-phone me-2 text-muted"></i>
                  {mockProfile.phone}
                </p>
              </div>
              <div className="col-md-6">
                <h6>Volunteer Details</h6>
                <p>
                  <i className="fas fa-calendar-check me-2 text-muted"></i>
                  Joined: {mockProfile.joined}
                </p>
                <p>
                  <i className="fas fa-clock me-2 text-muted"></i>
                  Hours volunteered: {mockProfile.hoursVolunteered}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <h6>Skills</h6>
              <div className="d-flex flex-wrap gap-2">
                {mockProfile.skills.map((skill, index) => (
                  <span key={index} className="badge bg-info">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h6>Availability</h6>
              <p>{mockProfile.availability}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Feedback Modal
  const renderFeedbackModal = () => (
    <div
      className={`modal fade ${showFeedbackModal ? "show d-block" : ""}`}
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">Task Completion</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={() => setShowFeedbackModal(false)}
            ></button>
          </div>
          <div className="modal-body">
            <p className="fw-bold">Task: {selectedTask?.title}</p>

            <div className="mb-3">
              <label className="form-label">Rate your experience:</label>
              <div className="d-flex justify-content-between">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="btn btn-link p-0"
                    onClick={() => setRating(star)}
                  >
                    <i
                      className={`fas fa-star fa-2x ${
                        star <= rating ? "text-warning" : "text-muted"
                      }`}
                    ></i>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Feedback (optional):</label>
              <textarea
                className="form-control"
                rows="3"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your experience or any challenges you faced..."
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowFeedbackModal(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={submitFeedback}
            >
              Submit & Complete Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container-fluid py-4">
      {renderFeedbackModal()}

      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="h3 mb-0">Volunteer Dashboard</h1>
              <p className="text-muted">
                Welcome back, {user?.name || "Volunteer"}!
              </p>
            </div>
            <div className="badge bg-success fs-6">Volunteer</div>
          </div>

          {/* Stats Cards */}
          <div className="row g-4 mb-4">
            <div className="col-md-3">
              <div className="card bg-primary text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4 className="card-title">{stats.totalTasks}</h4>
                      <p className="card-text">Total Tasks</p>
                    </div>
                    <div className="align-self-center">
                      <i className="fas fa-tasks fa-2x opacity-75"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card bg-success text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4 className="card-title">{stats.completedTasks}</h4>
                      <p className="card-text">Completed Tasks</p>
                    </div>
                    <div className="align-self-center">
                      <i className="fas fa-check-circle fa-2x opacity-75"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card bg-warning text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4 className="card-title">{stats.pendingTasks}</h4>
                      <p className="card-text">Pending Tasks</p>
                    </div>
                    <div className="align-self-center">
                      <i className="fas fa-clock fa-2x opacity-75"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card bg-info text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4 className="card-title">{stats.averageRating}</h4>
                      <p className="card-text">Average Rating</p>
                    </div>
                    <div className="align-self-center">
                      <i className="fas fa-star fa-2x opacity-75"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "tasks" ? "active" : ""}`}
                onClick={() => setActiveTab("tasks")}
              >
                <i className="fas fa-tasks me-2"></i>Your Tasks
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "events" ? "active" : ""}`}
                onClick={() => setActiveTab("events")}
              >
                <i className="fas fa-calendar-alt me-2"></i>Your Events
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "profile" ? "active" : ""
                }`}
                onClick={() => setActiveTab("profile")}
              >
                <i className="fas fa-user me-2"></i>Your Profile
              </button>
            </li>
          </ul>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === "tasks" && renderTasks()}
            {activeTab === "events" && renderEvents()}
            {activeTab === "profile" && renderProfile()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
