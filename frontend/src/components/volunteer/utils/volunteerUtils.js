// Helper functions
export const getPriorityBadge = (priority) => {
  const badges = {
    high: "badge bg-danger",
    medium: "badge bg-warning",
    low: "badge bg-success",
  };
  return badges[priority] || "badge bg-secondary";
};

export const getStatusBadge = (status) => {
  const badges = {
    new: "badge bg-info",
    processing: "badge bg-warning",
    complete: "badge bg-success",
  };
  return badges[status] || "badge bg-secondary";
};

export const getEventStatus = (eventDate) => {
  const today = new Date();
  const eventDateObj = new Date(eventDate);

  if (eventDateObj < today) {
    return { status: "Past", class: "badge bg-secondary" };
  } else if (eventDateObj.toDateString() === today.toDateString()) {
    return { status: "Today", class: "badge bg-warning" };
  } else {
    return { status: "Upcoming", class: "badge bg-primary" };
  }
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
