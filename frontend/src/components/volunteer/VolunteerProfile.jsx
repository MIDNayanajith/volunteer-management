import React from "react";
import { formatDate } from "./utils/volunteerUtils";

const VolunteerProfile = ({ profileLoading, profileError, profile }) => {
  if (profileLoading) {
    return (
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Your Profile</h5>
        </div>
        <div className="card-body">
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading your profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Your Profile</h5>
        </div>
        <div className="card-body">
          <div className="alert alert-danger">
            <i className="fas fa-exclamation-circle me-2"></i>
            {profileError}
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Your Profile</h5>
        </div>
        <div className="card-body">
          <div className="text-center py-4">
            <i className="fas fa-user fa-3x text-muted mb-3"></i>
            <p>No profile information available</p>
          </div>
        </div>
      </div>
    );
  }

  const joinedDate = formatDate(profile.created_at);

  return (
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
            <h5>{profile.name}</h5>
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
                  {profile.email}
                </p>
                {profile.phone && (
                  <p>
                    <i className="fas fa-phone me-2 text-muted"></i>
                    {profile.phone}
                  </p>
                )}
              </div>
              <div className="col-md-6">
                <h6>Volunteer Details</h6>
                <p>
                  <i className="fas fa-calendar-check me-2 text-muted"></i>
                  Joined: {joinedDate}
                </p>
                {profile.hours_volunteered && (
                  <p>
                    <i className="fas fa-clock me-2 text-muted"></i>
                    Hours volunteered: {profile.hours_volunteered}
                  </p>
                )}
              </div>
            </div>

            {profile.skills && profile.skills.length > 0 && (
              <div className="mb-4">
                <h6>Skills</h6>
                <div className="d-flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <span key={index} className="badge bg-info">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {profile.availability && (
              <div>
                <h6>Availability</h6>
                <p>{profile.availability}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerProfile;
