import React, { useState, useEffect } from "react";
import "../styles/notification.css";

const Notification = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return visible ? (
    <div className="notification">
      <p>{message}</p>
    </div>
  ) : null;
};

export default Notification;
