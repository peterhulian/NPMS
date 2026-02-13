import React from 'react';

const RoomCard = ({ room, onClick }) => {
  // Logic to change style based on dynamic data (Task 3)
  const isNoisy = room.status === "NOISE DETECTED";
  
  return (
    <div className="room-card" onClick={() => onClick(room)}>
      {/* Dynamic styling based on status */}
      <div className={`status-indicator ${isNoisy ? 'status-red' : 'status-green'}`}></div>
      
      <div className="card-content">
        <div className="card-header">
          <h3>{room.name}</h3>
          <span className={`status-badge ${isNoisy ? 'badge-red' : 'badge-green'}`}>
            {room.status}
          </span>
        </div>

        <p className="noise-level">
          Noise Level: <strong>{room.noiseLevel} dB</strong>
        </p>

        <div className={`teacher-info ${!room.teacher ? 'unassigned' : ''}`}>
          <label>Assigned Teacher:</label>
          <p>{room.teacher}</p>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;