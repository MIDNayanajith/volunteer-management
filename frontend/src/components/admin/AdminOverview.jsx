import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import StatsCards from "./StatsCards";
import TasksTable from "./TasksTable";
import TaskModal from "./TaskModal";
import UpcomingEvents from "./UpcomingEvents";

const AdminOverview = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState({
    totalVolunteers: 0,
    totalEvents: 0,
    totalTasks: 0,
    completedTasks: 0,
  });

  const [tasks, setTasks] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [events, setEvents] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
    fetchData();
  }, [token]);

  useEffect(() => {
    applyFilters();
  }, [tasks, priorityFilter, statusFilter, searchTerm]);

  const fetchStats = async () => {
    try {
      setStatsLoading(true);
      const response = await axios.get(
        "http://localhost:8000/api/admin/dashboard/stats",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.status === 200) {
        setStats(response.data.stats);
      }
    } catch (error) {
      console.error("Stats fetch error:", error);
      setError("Failed to load dashboard statistics");
    } finally {
      setStatsLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch tasks
      const tasksResponse = await axios.get(
        "http://localhost:8000/api/admin/getTasks",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (tasksResponse.data.status === 200) {
        setTasks(tasksResponse.data.data);
      } else {
        throw new Error("Failed to fetch tasks");
      }

      // Fetch volunteers
      const volunteersResponse = await axios.get(
        "http://localhost:8000/api/admin/getVolunteers",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (volunteersResponse.data.status === 200) {
        setVolunteers(volunteersResponse.data.data);
      } else {
        throw new Error("Failed to fetch volunteers");
      }

      // Fetch events
      const eventsResponse = await axios.get(
        "http://localhost:8000/api/admin/getEvents",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (eventsResponse.data.status === 200) {
        setEvents(eventsResponse.data.data);
      } else {
        throw new Error("Failed to fetch events");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let result = tasks;

    if (priorityFilter !== "all") {
      result = result.filter((task) => task.priority === priorityFilter);
    }

    if (statusFilter !== "all") {
      result = result.filter((task) => task.status === statusFilter);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(term) ||
          (task.assigned_to &&
            volunteers
              .find((v) => v.id === task.assigned_to)
              ?.name.toLowerCase()
              .includes(term))
      );
    }

    setFilteredTasks(result);
  };

  const resetFilters = () => {
    setPriorityFilter("all");
    setStatusFilter("all");
    setSearchTerm("");
  };

  const handleTaskSaved = (savedTask) => {
    if (taskToEdit) {
      setTasks(
        tasks.map((task) => (task.id === savedTask.id ? savedTask : task))
      );
    } else {
      setTasks([savedTask, ...tasks]);
    }
    setTaskToEdit(null);
    fetchStats(); // Refresh stats after task change
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setShowTaskModal(true);
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await axios.delete(
        `http://localhost:8000/api/admin/deleteTask/${taskId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(tasks.filter((task) => task.id !== taskId));
      fetchStats(); // Refresh stats after deletion
    } catch (error) {
      console.error("Delete error:", error);
      setError("Failed to delete task");
    }
  };

  return (
    <>
      {error && (
        <div className="alert alert-danger mb-4" role="alert">
          {error}
        </div>
      )}

      {statsLoading ? (
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading statistics...</p>
        </div>
      ) : (
        <StatsCards stats={stats} />
      )}

      <div className="row">
        <div className="col-md-8">
          <TasksTable
            tasks={filteredTasks}
            volunteers={volunteers}
            events={events}
            priorityFilter={priorityFilter}
            statusFilter={statusFilter}
            searchTerm={searchTerm}
            taskLoading={loading}
            onPriorityFilterChange={setPriorityFilter}
            onStatusFilterChange={setStatusFilter}
            onSearchTermChange={setSearchTerm}
            onResetFilters={resetFilters}
            onShowTaskModal={() => {
              setTaskToEdit(null);
              setShowTaskModal(true);
            }}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />
        </div>

        <div className="col-md-4">
          <UpcomingEvents events={events} />
        </div>
      </div>

      {showTaskModal && (
        <TaskModal
          show={showTaskModal}
          onClose={() => {
            setShowTaskModal(false);
            setTaskToEdit(null);
          }}
          onTaskSaved={handleTaskSaved}
          taskToEdit={taskToEdit}
        />
      )}
    </>
  );
};

export default AdminOverview;
