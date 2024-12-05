import mongoose, { Schema } from "mongoose";
const schema=mongoose.Schema;
const alumni= new schema({
     Name:{
        type:String,
       require:true,
     },
     id:{
         type:String,
         require:true,
         unique:true
     },
     password:{
        type:String,
        require:true,
        unique:true
     },
     email:{
          type:String,
          require:true,
          unique:true
     },
     mobilenumber:{
         type:Number,
         require:true,
         unique:true
     },
     JobRole:{
        type:String,
        require:true,
     },
     location:{
        type:String,
        require:true
     }
},{
    timestamps:true
})
 const alumnischema=mongoose.model('Aluminidata',alumni);
 export default alumnischema;