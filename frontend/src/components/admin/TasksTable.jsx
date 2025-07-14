import React from "react";

const TasksTable = ({
  tasks,
  volunteers,
  events,
  priorityFilter,
  statusFilter,
  searchTerm,
  taskLoading,
  onPriorityFilterChange,
  onStatusFilterChange,
  onSearchTermChange,
  onResetFilters,
  onShowTaskModal,
  onEditTask,
  onDeleteTask,
}) => {
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

  const getEventName = (eventId) => {
    if (!eventId) return "No event";
    const event = events.find((e) => e.id === eventId);
    return event ? event.name : "Unknown event";
  };

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Task Management</h5>
        <button className="btn btn-primary btn-sm" onClick={onShowTaskModal}>
          <i className="fas fa-plus me-1"></i>Add Task
        </button>
      </div>
      <div className="card-body">
        {/* Filter Controls */}
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => onSearchTermChange(e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-3">
            <select
              className="form-select"
              value={priorityFilter}
              onChange={(e) => onPriorityFilterChange(e.target.value)}
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
              onChange={(e) => onStatusFilterChange(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="processing">In Progress</option>
              <option value="complete">Complete</option>
            </select>
          </div>

          <div className="col-md-3">
            <button
              className="btn btn-outline-secondary w-100"
              onClick={onResetFilters}
            >
              <i className="fas fa-sync me-1"></i> Reset Filters
            </button>
          </div>
        </div>

        {taskLoading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-4">
            <i className="fas fa-tasks fa-3x text-muted mb-3"></i>
            <p>No tasks match your filters</p>
            <button className="btn btn-primary me-2" onClick={onResetFilters}>
              <i className="fas fa-sync me-1"></i> Reset Filters
            </button>
            <button className="btn btn-success" onClick={onShowTaskModal}>
              <i className="fas fa-plus me-1"></i>Create New Task
            </button>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Assigned To</th>
                  <th>Event</th>
                  <th>Due Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
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
                    <td>
                      {task.assigned_to
                        ? volunteers.find((v) => v.id === task.assigned_to)
                            ?.name || "Unknown"
                        : "Not assigned"}
                    </td>
                    <td>{getEventName(task.event_id)}</td>
                    <td>{new Date(task.due_date).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-1"
                        onClick={() => onEditTask(task)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onDeleteTask(task.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksTable;
