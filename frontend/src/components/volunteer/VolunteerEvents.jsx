import React from "react";
import { getEventStatus, formatDate } from "./utils/volunteerUtils";

const VolunteerEvents = ({ eventsLoading, eventsError, events }) => {
  if (eventsLoading) {
    return (
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Your Events</h5>
        </div>
        <div className="card-body">
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading your events...</p>
          </div>
        </div>
      </div>
    );
  }

  if (eventsError) {
    return (
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Your Events</h5>
        </div>
        <div className="card-body">
          <div className="alert alert-danger">
            <i className="fas fa-exclamation-circle me-2"></i>
            {eventsError}
          </div>
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Your Events</h5>
        </div>
        <div className="card-body">
          <div className="text-center py-4">
            <i className="fas fa-calendar-alt fa-3x text-muted mb-3"></i>
            <p>No events assigned to you yet</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">Your Events</h5>
      </div>
      <div className="card-body">
        <div className="row g-4">
          {events.map((event) => {
            const eventStatus = getEventStatus(event.date);
            return (
              <div key={event.id} className="col-md-6">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="flex-grow-1">
                        <h6 className="card-title">{event.name}</h6>
                        <p className="card-text mb-1">
                          <i className="fas fa-calendar me-2 text-primary"></i>
                          {formatDate(event.date)}
                        </p>
                        <p className="card-text mb-1">
                          <i className="fas fa-map-marker-alt me-2 text-primary"></i>
                          {event.location}
                        </p>
                        <p className="card-text mb-1">
                          <i className="fas fa-tasks me-2 text-primary"></i>
                          {event.completed_tasks}/{event.total_tasks} tasks
                          completed
                        </p>
                        {event.description && (
                          <p className="card-text text-muted small">
                            <i className="fas fa-info-circle me-2"></i>
                            {event.description.length > 100
                              ? `${event.description.substring(0, 100)}...`
                              : event.description}
                          </p>
                        )}
                      </div>
                      <span className={eventStatus.class}>
                        {eventStatus.status}
                      </span>
                    </div>

                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <small className="text-muted">Task Progress</small>
                        <small className="text-muted">
                          {Math.round(
                            (event.completed_tasks / event.total_tasks) * 100
                          )}
                          %
                        </small>
                      </div>
                      <div className="progress" style={{ height: "6px" }}>
                        <div
                          className="progress-bar bg-success"
                          style={{
                            width: `${
                              (event.completed_tasks / event.total_tasks) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer bg-transparent">
                    <button className="btn btn-sm btn-outline-primary">
                      <i className="fas fa-info-circle me-1"></i> View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VolunteerEvents;
