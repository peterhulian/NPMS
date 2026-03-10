import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import RoomCard from '../components/RoomCard';
import Modal from '../components/Modal';
import { getPendingApprovals, approveTeacher, rooms } from '../data/mockData';
import { Bell, Phone, FileText } from 'lucide-react'; 

const Dashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [approvals, setApprovals] = useState(getPendingApprovals());
  const [selectedRoom, setSelectedRoom] = useState(null);

  const isAdmin = user?.role === 'Admin';
  const isTeacher = user?.role === 'Teacher';

  const handleApprove = (id) => {
    approveTeacher(id);
    setApprovals([...getPendingApprovals()]); 
  };

  const handleReject = (id) => {
    const newList = approvals.filter(t => t.id !== id);
    setApprovals(newList);
  };

  const handleLogOutClick = () => {
    onLogout();
    navigate('/');
  };

  const myRoom = rooms.find(r => r.name === user?.room);
  const isNoisy = myRoom?.status === "NOISE DETECTED";

  return (
    <div className="dashboard-page">
      <Header userName={user?.name || 'User'} onLogout={handleLogOutClick} />
      <main className="dashboard-container">
        
        {isAdmin && (
          <>
            {approvals.length > 0 && (
              <section className="section-approvals">
                <h2>Pending Approvals</h2>
                <div className="approvals-list">
                  {approvals.map((item) => (
                    <div key={item.id} className="approval-card">
                      <div className="approval-info">
                        <strong>{item.name}</strong>
                        <p>{item.role} • {item.room}</p>
                      </div>
                      <div className="approval-actions">
                        <button className="btn-approve" onClick={() => handleApprove(item.id)}>✓</button>
                        <button className="btn-reject" onClick={() => handleReject(item.id)}>✕</button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            <section className="section-monitoring">
              <div className="section-header">
                <h2>Room Monitoring</h2>
                <button className="btn-report">🖨 Generate Report</button>
              </div>
              <div className="room-list">
                {rooms.map((room) => (
                  <RoomCard key={room.id} room={room} onClick={setSelectedRoom} />
                ))}
              </div>
            </section>
          </>
        )}

        {isTeacher && (
          <div className="teacher-dashboard">
            {myRoom ? (
              <>
                <div className={`big-alert-card ${isNoisy ? 'noisy' : 'quiet'}`}>
                  <div className="alert-icon">
                    {isNoisy ? <Bell size={60} color="#ef4444" fill="#ef4444" /> : <Bell size={60} color="#008055" />}
                  </div>
                  <h2 className={`alert-status ${isNoisy ? 'text-red' : 'text-green'}`}>{myRoom.status}</h2>
                  <div className="db-value">{myRoom.noiseLevel}<span className="db-unit">dB</span></div>
                  <p className="room-name-display">Room: {myRoom.name}</p>
                </div>
                <div className="teacher-actions">
                  <button className="action-btn btn-call-admin" onClick={() => alert("Calling Admin Office...")}>
                    <Phone size={24} /> Call Admin
                  </button>
                  <button className="action-btn btn-report-issue" onClick={() => alert("Report form generated.")}>
                    <FileText size={24} /> Report Issue
                  </button>
                </div>
              </>
            ) : (
              <div style={{textAlign: 'center', marginTop: '50px'}}>
                <h2>No Room Assigned</h2>
                <p>Please contact the administrator.</p>
              </div>
            )}
          </div>
        )}
      </main>
      {selectedRoom && <Modal room={selectedRoom} onClose={() => setSelectedRoom(null)} />}
    </div>
  );
};
export default Dashboard;