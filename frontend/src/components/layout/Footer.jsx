import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>
              <i className="fas fa-hands-helping me-2"></i>
              VolunteerHub
            </h5>
            <p className="text-muted">
              Connecting volunteers with meaningful opportunities to make a
              difference in their communities.
            </p>
          </div>

          <div className="col-md-4">
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-muted text-decoration-none">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted text-decoration-none">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-muted text-decoration-none">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-muted text-decoration-none">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-4">
            <h6>Contact Info</h6>
            <ul className="list-unstyled text-muted">
              <li>
                <i className="fas fa-envelope me-2"></i>
                info@volunteerhub.com
              </li>
              <li>
                <i className="fas fa-phone me-2"></i>
                +1 (555) 123-4567
              </li>
              <li>
                <i className="fas fa-map-marker-alt me-2"></i>
                123 Volunteer Street, City, State 12345
              </li>
            </ul>

            <div className="mt-3">
              <h6>Follow Us</h6>
              <div className="d-flex gap-3">
                <a href="#" className="text-muted">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-muted">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-muted">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-muted">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-4" />

        <div className="row">
          <div className="col-md-6">
            <small className="text-muted">
              © 2024 VolunteerHub. All rights reserved.
            </small>
          </div>
          <div className="col-md-6 text-md-end">
            <small className="text-muted">
              Made with <i className="fas fa-heart text-danger"></i> for
              volunteers
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
