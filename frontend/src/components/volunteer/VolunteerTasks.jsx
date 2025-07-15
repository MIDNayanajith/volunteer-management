import React, { useState } from "react";
import {
  getPriorityBadge,
  getStatusBadge,
  formatDate,
} from "./utils/volunteerUtils";

const VolunteerTasks = ({ loading, error, tasks, handleTaskAction }) => {
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.event?.name.toLowerCase().includes(searchTerm.toLowerCase()) ??
        false);

    const matchesPriority =
      priorityFilter === "all" || task.priority === priorityFilter;
    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;

    return matchesSearch && matchesPriority && matchesStatus;
  });

  const resetFilters = () => {
    setPriorityFilter("all");
    setStatusFilter("all");
    setSearchTerm("");
  };

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading your tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger">
        <i className="fas fa-exclamation-circle me-2"></i>
        {error}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-4">
        <i className="fas fa-tasks fa-3x text-muted mb-3"></i>
        <p>No tasks assigned to you yet</p>
      </div>
    );
  }

  if (filteredTasks.length === 0) {
    return (
      <div className="text-center py-4">
        <i className="fas fa-filter fa-3x text-muted mb-3"></i>
        <p>No tasks match your filters</p>
        <button className="btn btn-primary" onClick={resetFilters}>
          <i className="fas fa-sync me-1"></i> Reset Filters
        </button>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">Your Tasks</h5>
      </div>
      <div className="card-body">
        {/* Filter Controls */}
        <div className="row mb-4">
          <div className="col-md-4">
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-3">
            <select
              className="form-select"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>

          <div className="col-md-3">
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="processing">In Progress</option>
              <option value="complete">Complete</option>
            </select>
          </div>

          <div className="col-md-2">
            <button
              className="btn btn-outline-secondary w-100"
              onClick={resetFilters}
            >
              <i className="fas fa-sync me-1"></i> Reset
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Task</th>
                <th>Event</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Actions/(Submit Feedback)</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task.id}>
                  <td>
                    <div className="fw-bold">{task.title}</div>
                  </td>
                  <td>{task.event ? task.event.name : "No event"}</td>
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
                  <td>{formatDate(task.due_date)}</td>
                  <td>
                    {task.status !== "complete" && (
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => handleTaskAction(task, "complete")}
                      >
                        <i className="fas fa-check me-1"></i>Complete
                      </button>
                    )}
                    {task.status === "complete" && (
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
};

export default VolunteerTasks;
