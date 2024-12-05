import express from "express";
import cors from "cors"
import mongoose from "mongoose";
import alumnischema from "./Models/AlumniModel.js"
import studentsModel from "./Models/studentModel.js";
import Connection from "./Models/connection.js";
import session  from "express-session";

const app = express();
mongoose.connect("mongodb+srv://sridharancb22:9bHLq75maSdTnNO7@students-alumni-cluster.gxjz7.mongodb.net/Alumni")

.then(() => {
  console.log('Connected to MongoDB');
  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err);
});
app.use(express.json())
app.use(cors())
app.use(session({
  secret: 'your-secret-key',  // Secret key for the session
  resave: false,              // Don't resave unchanged sessions
  saveUninitialized: true,    // Save new sessions even if they are not modified
  cookie: { 
    secure: false, // Set to true if using HTTPS
    maxAge: 3600000 // 1 hour session expiry
  }
}));
app.post('/secedulemeet',(req,res)=>{
    const {time,date}=req.body;
    console.log(time);
    console.log(date);
     
      res.send("meeting sechduled!!") 
})
app.post('/putstudents',(req,res)=>{
   console.log(req.body);
     const {Name,RollNo,Department,password,email,MobileNo,skill}=req.body;
    
     const stumodel=new studentsModel({Name,RollNo,Department,password,email,MobileNo,skill});
     stumodel.save();
     res.send("students data stored sucessfilly!!");

})
app.post('/putalumni',(req,res)=>{
  try{
        const{Name,id,password,email,mobilenumber,JobRole,location}=req.body;
        console.log(Name+" "+JobRole+" "+email+" "+mobilenumber+" "+location);
        const alumni=new alumnischema({Name,id,password,email,mobilenumber,JobRole,location});
        alumni.save();
        res.send("sucessfull stored");
  } catch(error){
      console.log(error);
  }
})

app.get('/getAlumni', (req, res) => {
  alumnischema.find({}, 'Name id JobRole email -_id') 
    .then((alumniData) => {
      if (alumniData && alumniData.length > 0) {
        console.log(alumniData);
        res.json(alumniData);
        console.log(alumniData)  
      } else {
        res.status(404).json({ message: "No alumni found" });
      }
    })
    .catch((error) => {
      console.error("Error fetching alumni data:", error);
      res.status(500).json({ message: "Error fetching alumni data" });
    });
});
app.post('/connect', async (req, res) => {
  try {
    const { studentId, alumniId, studentName, AlumniName, message } = req.body;
    console.log("Received data:", req.body);
    // Create a new connection entry
    const newConnection = new Connection({
      studentId,
      alumniId,
      studentName,
      AlumniName,
      message,
      status: 'pending', // Set initial status to 'pending'
    });

    // Save the connection to the database
    await newConnection.save();

    // Send success response
    res.status(200).json({ message: 'Connection request sent successfully.' });
  } catch (error) {
    console.error("Error saving connection:", error);
    res.status(500).json({ message: 'Failed to send connection request.' });
  }
});

app.get('/getrequest/:alumniId', async (req, res) => {
  console.log("allll")
  const { alumniId } = req.params; // Get the alumniId from the URL parameter
  console.log("Received alumniId:", alumniId);  // Log the received alumniId

  try {
    
    if (mongoose.connection.readyState !== 1) {
      console.log("Database is not connected!");
      return res.status(500).json({ message: 'Database connection failed' });
    }

    // Clean the alumniId just in case there are extra spaces or unexpected characters
    const cleanedAlumniId = alumniId.trim();

    // Fetch pending requests where alumniId matches and status is "Pending"
    const pendingRequests = await Connection.find({
      alumniId: cleanedAlumniId,         // Match the alumniId
      status: 'pending'                  // Only fetch pending requests (case-sensitive match)
    });

    // Check if no requests were found
    if (pendingRequests.length === 0) {
      console.log("No pending requests found for alumniId:", cleanedAlumniId);  // Debugging line
    } else {
      console.log("Found pending requests:", pendingRequests); // Log found requests
    }

    res.status(200).json(pendingRequests); // Send the list of pending requests to the frontend
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ message: 'Error fetching requests' });
  }
});





app.post('/accept', async (req, res) => {
  try {
    const { connectionId } = req.body;

    const connection = await Connection.findById(connectionId);

    if (!connection) {
      return res.status(404).json({
        message: 'Connection not found.',
      });
    }

    connection.status = 'accepted';
    await connection.save();

    return res.status(200).json({
      message: 'Connection request accepted.',
      connection,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'An error occurred while accepting the connection request.',
    });
  }
});
app.post('/reject', async (req, res) => {
  try {
    const { connectionId } = req.body;

    const connection = await Connection.findById(connectionId);

    if (!connection) {
      return res.status(404).json({
        message: 'Connection not found.',
      });
    }

    connection.status = 'rejected';
    await connection.save();

    return res.status(200).json({
      message: 'Connection request rejected.',
      connection,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'An error occurred while rejecting the connection request.',
    });
  }
});
app.post("/checklogin", async (req, res) => {
  const { userId, password } = req.body;
  console.log(userId + " " + password);

  if (!userId || !password) {
    return res.status(400).json({ error: "User ID and password are required!" });
  }

  try {
    let user;

    // Check if userId starts with 'S' (Student) or 'A' (Alumni)
    if (userId.startsWith("S")) {
      console.log("Looking for student with RollNo:", userId);
      user = await studentsModel.findOne({ RollNo: userId });
      console.log("Student found:", user);
    } else if (userId.startsWith("A")) {
      console.log("Looking for alumni with ID:", userId);
      user = await alumnischema.findOne({ id: userId });
      console.log("Alumni found:", user);
    } else {
      return res.status(400).json({ error: "Invalid User ID format!" });
    }

    // If no user found, return error
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Debug log the password comparison
    console.log("Request password:", password);
    console.log("Stored password:", user.password);  // Check the stored plain text password

    // Directly compare the plain text password (no bcrypt)
    if (password !== user.password) {
      console.log("Password does not match");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    console.log("Password matches!");  // Debug log

    // Return the user data upon successful login
    res.status(200).json({
      userType: userId.startsWith("S") ? "student" : "alumnus",
      userId: userId,
      name: user.Name,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
});
app.post('/updateRequest', async (req, res) => {
  const { action, alumniId, studentId } = req.body;
  console.log(action);
  console.log(alumniId);

  console.log(studentId);


  // Check if the action is valid
  if (!['Approved', 'Rejected'].includes(action)) {
    return res.status(400).json({ success: false, message: 'Invalid action' });
  }

  try {
    // Check if both alumniId and studentId are provided
    if (!alumniId || !studentId) {
      return res.status(400).json({ success: false, message: 'Alumni ID and Student ID are required' });
    }

    // Find the request by alumniId and studentId and update the status
    const updatedRequest = await Connection.findOneAndUpdate(
      { alumniId: alumniId, studentId: studentId, status: 'pending' }, // Ensure status is pending before updating
      { status: action === 'Approved' ? 'accepted' : 'rejected' },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ success: false, message: 'Request not found or IDs do not match' });
    }

    // Send a success response
    res.status(200).json({
      success: true,
      message: `Request has been ${action === 'Approved' ? 'accepted' : 'rejected'}`,
      updatedRequest
    });
  } catch (error) {
    console.error('Error updating request:', error);
    res.status(500).json({ success: false, message: 'Error updating request' });
  }
});





