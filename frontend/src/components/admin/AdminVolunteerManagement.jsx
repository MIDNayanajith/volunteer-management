import React, { useState, useEffect } from "react";
import { mockVolunteers } from "../../utils/mockData";

const AdminVolunteerManagement = () => {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    setVolunteers(mockVolunteers);
  }, []);

  return (
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
              {volunteers.map((volunteer) => (
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
};

export default AdminVolunteerManagement;
