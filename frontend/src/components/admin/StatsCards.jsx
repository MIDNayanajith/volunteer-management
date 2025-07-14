import React from "react";

const StatsCards = ({ stats }) => {
  const cards = [
    {
      title: "Total Volunteers",
      value: stats.totalVolunteers,
      icon: "fas fa-users",
      bgColor: "bg-primary",
    },
    {
      title: "Active Events",
      value: stats.totalEvents,
      icon: "fas fa-calendar-alt",
      bgColor: "bg-success",
    },
    {
      title: "Total Tasks",
      value: stats.totalTasks,
      icon: "fas fa-tasks",
      bgColor: "bg-warning",
    },
    {
      title: "Completed Tasks",
      value: stats.completedTasks,
      icon: "fas fa-check-circle",
      bgColor: "bg-info",
    },
  ];

  return (
    <div className="row g-4 mb-4">
      {cards.map((card, index) => (
        <div key={index} className="col-md-3">
          <div className={`card ${card.bgColor} text-white`}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h4 className="card-title">{card.value}</h4>
                  <p className="card-text">{card.title}</p>
                </div>
                <div className="align-self-center">
                  <i className={`${card.icon} fa-2x opacity-75`}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
