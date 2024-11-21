import mongoose, { Schema } from "mongoose";
const students=mongoose.Schema;
const stu=new Schema({
      Name:{
        type:String,
        require:true
      },
      RollNo:{
        type:String,
        require:true
      },
      email:{
        type:String,
        require:true
      },
      MobileNo:{
        type:Number,
        require:true
      },
      skill:{
        type:String,
        require:true
      }
},
{
    timestamps:true
})
 const studentsModel=mongoose.model('studentsData',stu);
 export default studentsModel; 