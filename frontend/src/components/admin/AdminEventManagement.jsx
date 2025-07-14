import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import EventModal from "./EventModal";

const AdminEventManagement = () => {
  const { token } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  // Fetch events from backend
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8000/api/admin/getEvents",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // FIX: Use response.data.data instead of response.data.events
      setEvents(response.data.data || []);
      setError(null);
    } catch (err) {
      setError("Failed to load events. Please try again.");
      console.error("Events fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle create/update event
  const handleEventSubmit = async (eventData) => {
    try {
      const method = eventData.id ? "put" : "post";
      const url = eventData.id
        ? `http://localhost:8000/api/admin/updateEvent/${eventData.id}`
        : "http://localhost:8000/api/admin/createEvent";

      const response = await axios[method](url, eventData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (eventData.id) {
        setEvents(
          events.map((e) => (e.id === eventData.id ? response.data.event : e))
        );
      } else {
        // FIX: Add new event to the beginning of the list
        setEvents([response.data.event, ...events]);
      }
      setShowModal(false);
      setError(null);
    } catch (err) {
      console.error("Event operation error:", err);
      setError(
        err.response?.data?.message ||
          `Failed to ${eventData.id ? "update" : "create"} event`
      );
    }
  };

  // Handle delete event
  const handleDeleteEvent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await axios.delete(`http://localhost:8000/api/admin/deleteEvent/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(events.filter((event) => event.id !== id));
      setError(null);
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete event");
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Event Management</h5>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => {
            setCurrentEvent(null);
            setShowModal(true);
          }}
        >
          <i className="fas fa-plus me-1"></i>Create Event
        </button>
      </div>
      <div className="card-body">
        {error && (
          <div className="alert alert-danger mb-4" role="alert">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : events.length === 0 ? (
          <div className="alert alert-info">No events found</div>
        ) : (
          <div className="row g-4">
            {events.map((event) => (
              <div key={event.id} className="col-md-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h6 className="card-title">{event.name}</h6>
                    <p className="card-text">
                      <small className="text-muted">
                        <i className="fas fa-calendar me-1"></i>
                        {formatDate(event.date)}
                      </small>
                      <br />
                      <small className="text-muted">
                        <i className="fas fa-map-marker-alt me-1"></i>
                        {event.location}
                      </small>
                    </p>
                    <p className="card-text small">{event.description}</p>
                  </div>
                  <div className="card-footer">
                    <button
                      className="btn btn-sm btn-outline-primary me-1"
                      onClick={() => {
                        setCurrentEvent(event);
                        setShowModal(true);
                      }}
                    >
                      <i className="fas fa-edit"></i> Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDeleteEvent(event.id)}
                    >
                      <i className="fas fa-trash"></i> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Event Modal */}
      {showModal && (
        <EventModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleEventSubmit}
          event={currentEvent}
        />
      )}
    </div>
  );
};

export default AdminEventManagement;
