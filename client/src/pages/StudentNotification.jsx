
import { useEffect, useState } from "react";
import api from "../api/axios"; // ✅ central axios

const StudentDashboard = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await api.get("/notifications");
        setNotifications(res.data);
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Notifications</h2>
      {notifications.length === 0 && <p>No notifications yet.</p>}
      <ul>
        {notifications.map((notif) => (
          <li
            key={notif._id}
            className="bg-yellow-100 p-3 mb-2 rounded border-l-4 border-yellow-400"
          >
            {notif.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentDashboard;

