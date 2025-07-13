import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { isAuthenticated, isAdmin, isVolunteer } = useAuth();

  const getDashboardPath = () => {
    if (isAdmin()) return "/admin/dashboard";
    if (isVolunteer()) return "/volunteer/dashboard";
    return "/";
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center min-vh-50">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">
                Make a Difference with
                <span className="text-warning"> VolunteerHub</span>
              </h1>
              <p className="lead mb-4">
                Join thousands of volunteers making a positive impact in their
                communities. Connect with meaningful opportunities and track
                your volunteer journey.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                {isAuthenticated() ? (
                  <Link
                    to={getDashboardPath()}
                    className="btn btn-warning btn-lg px-4"
                  >
                    <i className="fas fa-tachometer-alt me-2"></i>
                    Go to Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="btn btn-warning btn-lg px-4"
                    >
                      <i className="fas fa-user-plus me-2"></i>
                      Get Started
                    </Link>
                    <Link
                      to="/login"
                      className="btn btn-outline-light btn-lg px-4"
                    >
                      <i className="fas fa-sign-in-alt me-2"></i>
                      Login
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <div className="hero-image">
                <i className="fas fa-hands-helping display-1 text-warning mb-3"></i>
                <div className="row g-3">
                  <div className="col-4">
                    <div className="card bg-light text-dark">
                      <div className="card-body text-center py-3">
                        <i className="fas fa-users text-primary mb-2"></i>
                        <h6>1000+</h6>
                        <small>Volunteers</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="card bg-light text-dark">
                      <div className="card-body text-center py-3">
                        <i className="fas fa-calendar-alt text-success mb-2"></i>
                        <h6>250+</h6>
                        <small>Events</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="card bg-light text-dark">
                      <div className="card-body text-center py-3">
                        <i className="fas fa-heart text-danger mb-2"></i>
                        <h6>5000+</h6>
                        <small>Lives Impacted</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 className="fw-bold mb-3">Why Choose VolunteerHub?</h2>
              <p className="text-muted">
                Streamlined volunteer management for maximum impact
              </p>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div
                    className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ width: "60px", height: "60px" }}
                  >
                    <i className="fas fa-tasks fa-lg"></i>
                  </div>
                  <h5 className="fw-bold mb-3">Task Management</h5>
                  <p className="text-muted">
                    Organize and track volunteer tasks with priority levels, due
                    dates, and progress monitoring.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div
                    className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ width: "60px", height: "60px" }}
                  >
                    <i className="fas fa-calendar-check fa-lg"></i>
                  </div>
                  <h5 className="fw-bold mb-3">Event Coordination</h5>
                  <p className="text-muted">
                    Create and manage volunteer events with location details,
                    schedules, and participant tracking.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div
                    className="bg-warning text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ width: "60px", height: "60px" }}
                  >
                    <i className="fas fa-star fa-lg"></i>
                  </div>
                  <h5 className="fw-bold mb-3">Feedback System</h5>
                  <p className="text-muted">
                    Collect valuable feedback from volunteers to improve
                    processes and recognize achievements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 className="fw-bold mb-3">How It Works</h2>
              <p className="text-muted">
                Simple steps to get started with volunteering
              </p>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-md-3 text-center">
              <div className="position-relative">
                <div
                  className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: "80px", height: "80px" }}
                >
                  <span className="fw-bold fs-4">1</span>
                </div>
                <h5 className="fw-bold mb-3">Register</h5>
                <p className="text-muted">
                  Create your volunteer account and complete your profile
                </p>
              </div>
            </div>

            <div className="col-md-3 text-center">
              <div className="position-relative">
                <div
                  className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: "80px", height: "80px" }}
                >
                  <span className="fw-bold fs-4">2</span>
                </div>
                <h5 className="fw-bold mb-3">Get Assigned</h5>
                <p className="text-muted">
                  Receive task assignments based on your skills and availability
                </p>
              </div>
            </div>

            <div className="col-md-3 text-center">
              <div className="position-relative">
                <div
                  className="bg-warning text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: "80px", height: "80px" }}
                >
                  <span className="fw-bold fs-4">3</span>
                </div>
                <h5 className="fw-bold mb-3">Volunteer</h5>
                <p className="text-muted">
                  Complete your assigned tasks and update progress
                </p>
              </div>
            </div>

            <div className="col-md-3 text-center">
              <div className="position-relative">
                <div
                  className="bg-info text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: "80px", height: "80px" }}
                >
                  <span className="fw-bold fs-4">4</span>
                </div>
                <h5 className="fw-bold mb-3">Make Impact</h5>
                <p className="text-muted">
                  Track your contributions and see the difference you make
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary text-white">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h2 className="fw-bold mb-3">Ready to Make a Difference?</h2>
              <p className="lead mb-4">
                Join our community of dedicated volunteers and start your impact
                journey today.
              </p>
              {!isAuthenticated() && (
                <Link to="/register" className="btn btn-warning btn-lg px-5">
                  <i className="fas fa-user-plus me-2"></i>
                  Join Now - It's Free!
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
