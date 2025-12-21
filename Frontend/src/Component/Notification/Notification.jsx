import React,{useState} from "react";

export function NotificationBell() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch("/api/notifications", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(res => res.json())
      .then(setNotifications);
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length ;

  return (
    <div className="relative">
      <button>🔔</button>
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-2 rounded-full">
          {unreadCount}
        </span>
      )}
    </div>
  );
}
