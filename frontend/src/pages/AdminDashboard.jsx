import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState({
    totalVolunteers: 0,
    totalEvents: 0,
    totalTasks: 0,
    completedTasks: 0,
  });

  // Mock data - replace with actual API calls
  const mockEvents = [
    {
      id: 1,
      name: "Community Cleanup",
      date: "2024-02-15",
      location: "Central Park",
      status: "Active",
    },
    {
      id: 2,
      name: "Food Drive",
      date: "2024-02-20",
      location: "Community Center",
      status: "Planned",
    },
    {
      id: 3,
      name: "Blood Donation",
      date: "2024-02-25",
      location: "Hospital",
      status: "Active",
    },
  ];

  const mockTasks = [
    {
      id: 1,
      title: "Setup Registration Booth",
      priority: "high",
      status: "new",
      assignedTo: "John Doe",
      dueDate: "2024-02-15",
    },
    {
      id: 2,
      title: "Coordinate Volunteers",
      priority: "medium",
      status: "processing",
      assignedTo: "Jane Smith",
      dueDate: "2024-02-16",
    },
    {
      id: 3,
      title: "Prepare Welcome Packets",
      priority: "low",
      status: "complete",
      assignedTo: "Mike Johnson",
      dueDate: "2024-02-14",
    },
  ];

  const mockVolunteers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      tasksAssigned: 5,
      tasksCompleted: 3,
      rating: 4.5,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      tasksAssigned: 8,
      tasksCompleted: 7,
      rating: 4.8,
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      tasksAssigned: 3,
      tasksCompleted: 3,
      rating: 4.2,
    },
  ];

  useEffect(() => {
    // Mock API call to get stats
    setStats({
      totalVolunteers: mockVolunteers.length,
      totalEvents: mockEvents.length,
      totalTasks: mockTasks.length,
      completedTasks: mockTasks.filter((task) => task.status === "complete")
        .length,
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
      processing: "badge bg-warning",
      complete: "badge bg-success",
    };
    return badges[status] || "badge bg-secondary";
  };

  const renderOverview = () => (
    <>
      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h4 className="card-title">{stats.totalVolunteers}</h4>
                  <p className="card-text">Total Volunteers</p>
                </div>
                <div className="align-self-center">
                  <i className="fas fa-users fa-2x opacity-75"></i>
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
                  <h4 className="card-title">{stats.totalEvents}</h4>
                  <p className="card-text">Active Events</p>
                </div>
                <div className="align-self-center">
                  <i className="fas fa-calendar-alt fa-2x opacity-75"></i>
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
          <div className="card bg-info text-white">
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
      </div>

      {/* Recent Activities */}
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Recent Tasks</h5>
              <button className="btn btn-primary btn-sm">
                <i className="fas fa-plus me-1"></i>Add Task
              </button>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Task</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th>Assigned To</th>
                      <th>Due Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockTasks.map((task) => (
                      <tr key={task.id}>
                        <td>{task.title}</td>
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
                        <td>{task.assignedTo}</td>
                        <td>{task.dueDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Upcoming Events</h5>
            </div>
            <div className="card-body">
              {mockEvents.map((event) => (
                <div
                  key={event.id}
                  className="d-flex justify-content-between align-items-center mb-3 p-3 bg-light rounded"
                >
                  <div>
                    <h6 className="mb-1">{event.name}</h6>
                    <small className="text-muted">
                      <i className="fas fa-calendar me-1"></i>
                      {event.date}
                    </small>
                    <br />
                    <small className="text-muted">
                      <i className="fas fa-map-marker-alt me-1"></i>
                      {event.location}
                    </small>
                  </div>
                  <span className="badge bg-primary">{event.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderVolunteers = () => (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Volunteer Management</h5>
        <button className="btn btn-primary btn-sm">
          <i className="fas fa-user-plus me-1"></i>Add Volunteer
        </button>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Tasks Assigned</th>
                <th>Tasks Completed</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockVolunteers.map((volunteer) => (
                <tr key={volunteer.id}>
                  <td>{volunteer.name}</td>
                  <td>{volunteer.email}</td>
                  <td>{volunteer.tasksAssigned}</td>
                  <td>{volunteer.tasksCompleted}</td>
                  <td>
                    <span className="text-warning">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`fas fa-star ${
                            i < Math.floor(volunteer.rating) ? "" : "text-muted"
                          }`}
                        ></i>
                      ))}
                    </span>
                    <small className="text-muted ms-1">
                      ({volunteer.rating})
                    </small>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-1">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="btn btn-sm btn-outline-danger">
                      <i className="fas fa-trash"></i>
                    </button>
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
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Event Management</h5>
        <button className="btn btn-primary btn-sm">
          <i className="fas fa-plus me-1"></i>Create Event
        </button>
      </div>
      <div className="card-body">
        <div className="row g-4">
          {mockEvents.map((event) => (
            <div key={event.id} className="col-md-4">
              <div className="card h-100">
                <div className="card-body">
                  <h6 className="card-title">{event.name}</h6>
                  <p className="card-text">
                    <small className="text-muted">
                      <i className="fas fa-calendar me-1"></i>
                      {event.date}
                    </small>
                    <br />
                    <small className="text-muted">
                      <i className="fas fa-map-marker-alt me-1"></i>
                      {event.location}
                    </small>
                  </p>
                  <span className="badge bg-primary">{event.status}</span>
                </div>
                <div className="card-footer">
                  <button className="btn btn-sm btn-outline-primary me-1">
                    <i className="fas fa-edit"></i> Edit
                  </button>
                  <button className="btn btn-sm btn-outline-danger">
                    <i className="fas fa-trash"></i> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="h3 mb-0">Admin Dashboard</h1>
              <p className="text-muted">Welcome back, {user?.name}!</p>
            </div>
            <div className="badge bg-primary fs-6">Administrator</div>
          </div>

          {/* Navigation Tabs */}
          <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "overview" ? "active" : ""
                }`}
                onClick={() => setActiveTab("overview")}
              >
                <i className="fas fa-tachometer-alt me-2"></i>Overview
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "volunteers" ? "active" : ""
                }`}
                onClick={() => setActiveTab("volunteers")}
              >
                <i className="fas fa-users me-2"></i>Volunteers
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "events" ? "active" : ""}`}
                onClick={() => setActiveTab("events")}
              >
                <i className="fas fa-calendar-alt me-2"></i>Events
              </button>
            </li>
          </ul>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === "overview" && renderOverview()}
            {activeTab === "volunteers" && renderVolunteers()}
            {activeTab === "events" && renderEvents()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
