import React from "react";

const UpcomingEvents = ({ events }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">Upcoming Events</h5>
      </div>
      <div className="card-body">
        {events.map((event) => (
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
  );
};

export default UpcomingEvents;
