import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import AdminOverview from "../components/admin/AdminOverview";
import AdminVolunteerManagement from "../components/admin/AdminVolunteerManagement";
import AdminEventManagement from "../components/admin/AdminEventManagement";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <AdminOverview />;
      case "volunteers":
        return <AdminVolunteerManagement />;
      case "events":
        return <AdminEventManagement />;
      default:
        return <AdminOverview />;
    }
  };

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
          <div className="tab-content">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
