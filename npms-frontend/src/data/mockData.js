// =========================================
// 1. INITIAL DATA (The "Database")
// =========================================

// ACTIVE USERS: People who can log in right now
// Note: I assigned Mrs. Cruz to "Room 2" so you can see the Red Alert immediately.
let users = [
  { 
    id: 1, 
    email: 'admin@school.edu', 
    password: 'admin', 
    name: 'Principal', 
    role: 'Admin' 
  },
  { 
    id: 2, 
    email: 'teacher@school.edu', 
    password: '123', 
    name: 'Mrs. Cruz', 
    role: 'Teacher',
    room: 'Room 2' // Assigned to the NOISY room
  }
];

// PENDING APPROVALS: People waiting for Admin to click checkmark
let pendingApprovals = [
  { 
    id: 101, 
    name: "Jan Andrei Otinggey", 
    role: "Teacher", 
    room: "Room 2", 
    email: "jan@test.com",
    password: "password"
  }
];

// ROOMS: The data shown on the dashboard cards
export const rooms = [
  {
    id: 2,
    name: "Room 2",
    noiseLevel: 79.1,
    status: "NOISE DETECTED",
    teacher: "Jan Andrei Otinggey",
    phone: "09631105397"
  },
  {
    id: 1,
    name: "Room 1",
    noiseLevel: 71.9,
    status: "QUIET",
    teacher: "Unassigned",
    phone: null
  }
];

// =========================================
// 2. HELPER FUNCTIONS (The "API")
// =========================================

export const checkLogin = (email, password) => {
  const user = users.find(u => u.email === email && u.password === password);
  return user ? user : null;
};

export const getPendingApprovals = () => {
  return pendingApprovals;
};

export const addRegistration = (userData) => {
  const newId = Date.now(); 
  const newUser = { id: newId, ...userData };
  pendingApprovals.push(newUser);
  console.log("New User Registered:", newUser);
};

export const approveTeacher = (id) => {
  const index = pendingApprovals.findIndex(t => t.id === id);
  if (index !== -1) {
    const approvedUser = pendingApprovals[index];
    users.push(approvedUser);
    pendingApprovals.splice(index, 1);
    
    // Auto-assign them to the room data
    const roomIndex = rooms.findIndex(r => r.name === approvedUser.room);
    if (roomIndex !== -1) {
      rooms[roomIndex].teacher = approvedUser.name;
    }
    return true; 
  }
  return false; 
};