import React from "react";

const FeedbackModal = ({
  show,
  onClose,
  onSubmit,
  feedback,
  setFeedback,
  rating,
  setRating,
  feedbackLoading,
  selectedTask,
}) => {
  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">
              <i className="fas fa-star me-2"></i>
              Complete Task & Add Feedback
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              disabled={feedbackLoading}
            ></button>
          </div>
          <div className="modal-body">
            {selectedTask && (
              <div className="alert alert-info">
                <i className="fas fa-info-circle me-2"></i>
                <strong>Task:</strong> {selectedTask.title}
                <br />
                <strong>Event:</strong>{" "}
                {selectedTask.event ? selectedTask.event.name : "No event"}
                <br />
                <strong>Due Date:</strong>{" "}
                {new Date(selectedTask.due_date).toLocaleDateString()}
              </div>
            )}

            <div className="mb-4">
              <label className="form-label fw-bold">
                <i className="fas fa-star text-warning me-2"></i>
                Rate your experience: <span className="text-danger">*</span>
              </label>
              <div className="d-flex justify-content-center gap-2 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="btn btn-link p-0"
                    onClick={() => setRating(star)}
                    disabled={feedbackLoading}
                  >
                    <i
                      className={`fas fa-star fa-2x ${
                        star <= rating ? "text-warning" : "text-muted"
                      }`}
                    ></i>
                  </button>
                ))}
              </div>
              <div className="text-center">
                <small className="text-muted">
                  {rating === 1 && "Poor"}
                  {rating === 2 && "Fair"}
                  {rating === 3 && "Good"}
                  {rating === 4 && "Very Good"}
                  {rating === 5 && "Excellent"}
                </small>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">
                <i className="fas fa-comment me-2"></i>
                Your feedback: <span className="text-danger">*</span>
              </label>
              <textarea
                className="form-control"
                rows="4"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Please share your experience with this task. What went well? Any challenges faced? Suggestions for improvement?"
                required
                disabled={feedbackLoading}
              ></textarea>
              <div className="form-text">
                <small className="text-muted">
                  Characters: {feedback.length}/1000
                </small>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={feedbackLoading}
            >
              <i className="fas fa-times me-1"></i>
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onSubmit}
              disabled={
                feedbackLoading || !feedback.trim() || feedback.length > 1000
              }
            >
              {feedbackLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                  Submitting...
                </>
              ) : (
                <>
                  <i className="fas fa-check me-1"></i>
                  Submit Feedback & Complete Task
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
