import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const AdminFormModal = ({ show, onClose }) => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (formData.password.length > 12) {
      newErrors.password = "Password cannot exceed 12 characters";
    }

    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      setErrors({});

      const response = await axios.post(
        "http://localhost:8000/api/admin/register",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setSuccess(true);
        // Reset form on success
        setFormData({
          name: "",
          email: "",
          password: "",
          password_confirmation: "",
        });

        // Close modal after 2 seconds
        setTimeout(() => {
          setSuccess(false);
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error("Admin registration error:", error);

      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else if (error.response?.data?.message) {
        setErrors({ submit: error.response.data.message });
      } else {
        setErrors({ submit: "Failed to register admin. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">Register New Administrator</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              disabled={loading}
            ></button>
          </div>
          <div className="modal-body">
            {success ? (
              <div className="alert alert-success text-center">
                <i className="fas fa-check-circle fa-2x mb-2"></i>
                <h4>Admin Registered Successfully!</h4>
                <p>New administrator has been added to the system.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {errors.submit && (
                  <div className="alert alert-danger">{errors.submit}</div>
                )}

                <div className="mb-3">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    disabled={loading}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    disabled={loading}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Password *</label>
                    <input
                      type="password"
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="8-12 characters"
                      disabled={loading}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Confirm Password *</label>
                    <input
                      type="password"
                      className={`form-control ${
                        errors.password_confirmation ? "is-invalid" : ""
                      }`}
                      name="password_confirmation"
                      value={formData.password_confirmation}
                      onChange={handleInputChange}
                      placeholder="Confirm password"
                      disabled={loading}
                    />
                    {errors.password_confirmation && (
                      <div className="invalid-feedback">
                        {errors.password_confirmation}
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-text mb-3">
                  <small>
                    * Administrator accounts have full access to the system
                  </small>
                </div>

                <div className="modal-footer border-0 pt-0">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onClose}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Registering...
                      </>
                    ) : (
                      "Register Administrator"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFormModal;
