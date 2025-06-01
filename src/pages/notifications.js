import React, { useState, useEffect } from "react";
import axios from "axios";
import "../pagesstyle/notifications.css";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const storedPackages = JSON.parse(localStorage.getItem("packages"));

      if (storedPackages && storedPackages.length > 0) {
        try {
          const allNotifications = await Promise.all(
            storedPackages.map(async (pkg, index) => {
              const response = await axios.get(
                `http://localhost:5000/api/notifications?packageId=${pkg.package_id}`
              );

              if (
                response.data.success &&
                response.data.notifications.length > 0
              ) {
                const notif = response.data.notifications[0];
                return {
                  id: index + 1,
                  text: notif.message,
                  unread: true,
                };
              }
              return null;
            })
          );

          const filtered = allNotifications.filter((n) => n !== null);
          setNotifications(filtered);
        } catch (error) {
          console.error("Error while fetching notifications:", error);
          setNotifications([]);
        }
      } else {
        setNotifications([]);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, unread: false } : notif
      )
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="notifications-container">
      <div className="notifications-box">
        <h2>Notifications</h2>
        {notifications.length === 0 ? (
          <p className="no-notifications">You have no new notifications</p>
        ) : (
          <ul className="notifications-list">
            {notifications.map((notif) => (
              <li key={notif.id} className={notif.unread ? "unread" : ""}>
                <span>{notif.text}</span>
                {notif.unread && (
                  <button
                    className="mark-read-btn"
                    onClick={() => markAsRead(notif.id)}
                  >
                    Mark as Read
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
        {notifications.length > 0 && (
          <div className="buttons">
            <button className="clear-btn" onClick={clearAll}>
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notifications;