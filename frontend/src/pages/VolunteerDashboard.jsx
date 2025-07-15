import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import VolunteerStats from "../components/volunteer/VolunteerStats";
import VolunteerTasks from "../components/volunteer/VolunteerTasks";
import VolunteerEvents from "../components/volunteer/VolunteerEvents";
import VolunteerProfile from "../components/volunteer/VolunteerProfile";
import FeedbackModal from "../components/volunteer/FeedbackModal";

const VolunteerDashboard = () => {
  const { user: authUser, token } = useAuth();
  const [activeTab, setActiveTab] = useState("tasks");
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(5);
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);
  const [error, setError] = useState(null);
  const [eventsError, setEventsError] = useState(null);
  const [profileError, setProfileError] = useState(null);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [profile, setProfile] = useState(null);

  // Stats state
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    averageRating: 0,
  });

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setProfileLoading(true);
        const response = await axios.get(
          "http://localhost:8000/api/volunteer/profile",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.status === 200) {
          setProfile(response.data.profile);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setProfileError("Failed to load profile. Please try again.");
      } finally {
        setProfileLoading(false);
      }
    };

    if (token) {
      fetchProfile();
    }
  }, [token]);

  // Fetch assigned tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:8000/api/volunteer/getAssignedTasks",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.status === 200) {
          setTasks(response.data.data);

          // Calculate stats
          const completed = response.data.data.filter(
            (task) => task.status === "complete"
          ).length;

          setStats({
            totalTasks: response.data.data.length,
            completedTasks: completed,
            pendingTasks: response.data.data.length - completed,
            averageRating: 4.7,
          });
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError("Failed to load tasks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchTasks();
    }
  }, [token]);

  // Fetch user events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setEventsLoading(true);
        const response = await axios.get(
          "http://localhost:8000/api/volunteer/getUserEvents",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.status === 200) {
          setEvents(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setEventsError("Failed to load events. Please try again.");
      } finally {
        setEventsLoading(false);
      }
    };

    if (token) {
      fetchEvents();
    }
  }, [token]);

  const handleTaskAction = (task, action) => {
    if (action === "complete") {
      setSelectedTask(task);
      setShowFeedbackModal(true);
      setFeedback("");
      setRating(5);
    }
  };

  const submitFeedback = async () => {
    if (!selectedTask) return;

    setFeedbackLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/volunteer/feedback",
        {
          task_id: selectedTask.id,
          rating: rating,
          comment: feedback,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.status === 200) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === selectedTask.id ? { ...task, status: "complete" } : task
          )
        );

        setStats((prevStats) => ({
          ...prevStats,
          completedTasks: prevStats.completedTasks + 1,
          pendingTasks: prevStats.pendingTasks - 1,
        }));

        setShowFeedbackModal(false);
        setFeedback("");
        setRating(5);
        setSelectedTask(null);
        alert("Feedback submitted successfully and task marked as complete!");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      let errorMessage = "Failed to submit feedback. Please try again.";

      if (error.response?.data?.message) {
        if (typeof error.response.data.message === "object") {
          errorMessage = Object.values(error.response.data.message)
            .flat()
            .join(", ");
        } else {
          errorMessage = error.response.data.message;
        }
      }

      alert(errorMessage);
    } finally {
      setFeedbackLoading(false);
    }
  };

  return (
    <div className="container-fluid py-4">
      <FeedbackModal
        show={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        onSubmit={submitFeedback}
        feedback={feedback}
        setFeedback={setFeedback}
        rating={rating}
        setRating={setRating}
        feedbackLoading={feedbackLoading}
        selectedTask={selectedTask}
      />

      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="h3 mb-0">Volunteer Dashboard</h1>
              <p className="text-muted">
                Welcome back, {authUser?.name || "Volunteer"}!
              </p>
            </div>
            <div className="badge bg-success fs-6">Volunteer</div>
          </div>

          <VolunteerStats stats={stats} />

          <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "tasks" ? "active" : ""}`}
                onClick={() => setActiveTab("tasks")}
              >
                <i className="fas fa-tasks me-2"></i>Your Tasks
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "events" ? "active" : ""}`}
                onClick={() => setActiveTab("events")}
              >
                <i className="fas fa-calendar-alt me-2"></i>Your Events
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "profile" ? "active" : ""
                }`}
                onClick={() => setActiveTab("profile")}
              >
                <i className="fas fa-user me-2"></i>Your Profile
              </button>
            </li>
          </ul>

          <div className="tab-content">
            {activeTab === "tasks" && (
              <VolunteerTasks
                loading={loading}
                error={error}
                tasks={tasks}
                handleTaskAction={handleTaskAction}
              />
            )}

            {activeTab === "events" && (
              <VolunteerEvents
                eventsLoading={eventsLoading}
                eventsError={eventsError}
                events={events}
              />
            )}

            {activeTab === "profile" && (
              <VolunteerProfile
                profileLoading={profileLoading}
                profileError={profileError}
                profile={profile}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
