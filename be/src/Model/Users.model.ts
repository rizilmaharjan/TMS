import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const {Schema} = mongoose;


const userSchema = new Schema({
    fullname:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique:  true,
        lowercase: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    phone:{
        type: Number,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,

    },
    profileImage:{
        type: String,
        default: "https://i.stack.imgur.com/l60Hf.png"
    },
    address:{
        type: String,
        default: "N/A"
    },
    gender:{
        type: String,
        default: "N/A"
    },
    position:{
        type: String,
        default: "N/A"
    },
    
},{timestamps:true})


// hashing password
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      this.password =await bcrypt.hash(this.password, 12);
    }
    next();
  });

// user model
export const userModel = mongoose.model("user", userSchema)
