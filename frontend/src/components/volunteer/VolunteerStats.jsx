import React, { useState, useEffect } from "react";
import axios from "axios";

const VolunteerStats = () => {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    averageRating: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8000/api/volunteer/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status === 200) {
          setStats(response.data.stats);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading statistics...</div>;
  }

  return (
    <div className="row g-4 mb-4">
      {/* Card 1: Total Tasks */}
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

      {/* Card 2: Completed Tasks */}
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

      {/* Card 3: Pending Tasks */}
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

      {/* Card 4: Average Rating */}
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
  );
};

export default VolunteerStats;
