import React, { useState, useEffect } from "react";
import styled from "styled-components";

const UpdateNotification = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: #10b981;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

interface LiveUpdateIndicatorProps {
  lastUpdate: number;
}

const LiveUpdateIndicator: React.FC<LiveUpdateIndicatorProps> = ({
  lastUpdate,
}) => {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (lastUpdate > 0) {
      setShowNotification(true);
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [lastUpdate]);

  if (!showNotification) return null;

  return <UpdateNotification>✨ Preview updated</UpdateNotification>;
};

export default LiveUpdateIndicator;
