import mongoose from 'mongoose';

const connectionSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      ref: 'studentModel', // Assumes you have a Student model
      required: true,
    },
    alumniId: {
      type: String,
      ref: 'AlumniModel', // Assumes you have an Alumni model
      required: true,
    },
    studentName:{
       type:String,
       required:true
    },
    AlumniName:{
      type:String,
      required:false
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
    message: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Connection = mongoose.model('Connection', connectionSchema);

export default Connection;
