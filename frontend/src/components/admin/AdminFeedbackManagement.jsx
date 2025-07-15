import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminFeedbackManagement = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8000/api/admin/feedbacks",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status === 200) {
          setFeedbacks(response.data.feedbacks);
          setFilteredFeedbacks(response.data.feedbacks);
        }
      } catch (err) {
        setError("Failed to load feedback data");
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const filtered = feedbacks.filter(
        (feedback) =>
          feedback.task_title.toLowerCase().includes(term) ||
          feedback.volunteer_name.toLowerCase().includes(term) ||
          feedback.comment.toLowerCase().includes(term)
      );
      setFilteredFeedbacks(filtered);
    } else {
      setFilteredFeedbacks(feedbacks);
    }
  }, [searchTerm, feedbacks]);

  if (loading) {
    return (
      <div className="card">
        <div className="card-body text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading feedback data...</p>
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
        <h5 className="mb-0">Feedback Management</h5>
        <div className="col-md-4">
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search feedback..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="card-body">
        {filteredFeedbacks.length === 0 ? (
          <div className="text-center py-4">
            <i className="fas fa-comments fa-3x text-muted mb-3"></i>
            <p>No feedback found</p>
            <button
              className="btn btn-primary"
              onClick={() => setSearchTerm("")}
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Volunteer</th>
                  <th>Rating</th>
                  <th>Comment</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredFeedbacks.map((feedback) => (
                  <tr key={feedback.id}>
                    <td>{feedback.task_title}</td>
                    <td>{feedback.volunteer_name}</td>
                    <td>
                      <span className="text-warning">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`fas fa-star ${
                              i < feedback.rating ? "" : "text-muted"
                            }`}
                          ></i>
                        ))}
                        <small className="text-muted ms-1">
                          ({feedback.rating})
                        </small>
                      </span>
                    </td>
                    <td>{feedback.comment}</td>
                    <td>
                      {new Date(feedback.created_at).toLocaleDateString()}
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

export default AdminFeedbackManagement;
