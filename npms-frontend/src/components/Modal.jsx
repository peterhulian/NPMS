import React from 'react';

const Modal = ({ room, onClose }) => {
  if (!room) return null;
  const isNoisy = room.status === "NOISE DETECTED";

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Manage {room.name}</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>
        
        <div className="modal-body">
          <p className={`status-text ${isNoisy ? 'text-red' : 'text-green'}`}>
            Status: <strong>{room.status}</strong>
          </p>
          
          <p>Teacher: {room.teacher}</p>
          {room.phone && <p>Number: {room.phone}</p>}
          {!room.phone && <p><i>No teacher assigned to this room.</i></p>}
        </div>

        <div className="modal-actions">
           {/* Semantic HTML: Buttons  */}
          <button className="btn btn-call">📞 Call</button>
          <button className="btn btn-msg">💬 Msg</button>
          <button className="btn btn-edit">📝</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;