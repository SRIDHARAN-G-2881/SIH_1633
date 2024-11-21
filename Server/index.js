import express from "express";
import cors from "cors"
import mongoose from "mongoose";
import alumnischema from "./Models/AlumniModel.js"
import studentsModel from "./Models/studentModel.js";
import Connection from "./Models/connection.js";

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
app.post('/secedulemeet',(req,res)=>{
    const {time,date}=req.body;
    console.log(time);
    console.log(date);
     
      res.send("meeting sechduled!!") 
})
app.post('/putstudents',(req,res)=>{
     const {Name,RollNo,email,MobileNo,skill}=req.body;
     const stumodel=new studentsModel({Name,RollNo,email,MobileNo,skill});
     stumodel.save();
     res.send("students data stored sucessfilly!!");

})
app.post('/put',(req,res)=>{
  try{
        const{Name,id,JobRole,email,mobilenumber,location}=req.body;
        console.log(Name+" "+JobRole+" "+email+" "+mobilenumber+" "+location);
        const alumni=new alumnischema({Name,id,JobRole,email,mobilenumber,location});
        alumni.save();
        res.send("sucessfull stored");
  } catch(error){
      console.log(error);
  }
})
app.get('/connect',(req,res)=>{
    res.json({
        "name":"sridharan",
        "department":"csbs",
        "semester":"v"
    })
})
app.get('/getAlumni', (req, res) => {
  // Query the 'aluminidatas' collection to get only 'Name', 'JobRole', and 'email' (and exclude '_id')
  alumnischema.find({}, 'Name id JobRole email -_id')  // '-_id' excludes the _id field
    .then((alumniData) => {
      // Check if any data is returned and respond accordingly
      if (alumniData && alumniData.length > 0) {
        res.json(alumniData);
        console.log(alumniData)  // Send the result as JSON
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
    const { studentId, alumniId, message } = req.body;

    // Check if the connection request already exists
    const existingConnection = await Connection.findOne({
      studentId,
      alumniId,
    });

    if (existingConnection) {
      return res.status(400).json({
        message: 'Connection request already exists.',
      });
    }

    // Create a new connection request
    const newConnection = new Connection({
      studentId,
      alumniId,
      message,
    });

    await newConnection.save();

    return res.status(201).json({
      message: 'Connection request sent successfully.',
      connection: newConnection,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'An error occurred while sending the connection request.',
    });
  }
});
app.get("/getrequest/:alumniId", async (req, res) => {
  const { alumniId } = req.params;
  console.log("Fetching requests for adminId:", alumniId);  // Log the adminId

  try {
    const pendingRequests = await Connection.find({
      alumniId: alumniId,    
      status: "pending",  
    });

    console.log("Pending requests:", pendingRequests);  // Log the result of the query
    res.json(pendingRequests); // Return the list of pending requests
  } catch (error) {
    console.error("Error fetching requests:", error);  // Log the error
    res.status(500).json({ message: "Error fetching requests" });
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





