import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminVolunteerManagement = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8000/api/admin/volunteers-management",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status === 200) {
          setVolunteers(response.data.volunteers);
        }
      } catch (err) {
        setError("Failed to load volunteer data");
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteers();
  }, []);

  if (loading) {
    return (
      <div className="card">
        <div className="card-body text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading volunteer data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <div className="card-body">
          <div className="alert alert-danger">
            <i className="fas fa-exclamation-circle me-2"></i>
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Volunteer Management</h5>
        <button className="btn btn-primary btn-sm">
          <i className="fas fa-user-plus me-1"></i>Add Volunteer
        </button>
      </div>
      <div className="card-body">
        {volunteers.length === 0 ? (
          <div className="text-center py-4">
            <i className="fas fa-users fa-3x text-muted mb-3"></i>
            <p>No volunteers found</p>
          </div>
        ) : (
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
                    <td>{volunteer.tasks_assigned}</td>
                    <td>{volunteer.tasks_completed}</td>
                    <td>
                      <span className="text-warning">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`fas fa-star ${
                              i < Math.floor(volunteer.rating)
                                ? ""
                                : "text-muted"
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
        )}
      </div>
    </div>
  );
};

export default AdminVolunteerManagement;
