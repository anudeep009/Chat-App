import { Schema, model, } from 'mongoose';


const UserSchema  = new Schema({
    username: { type: String, required: true, unique: true, trim: true, minlength: 3, maxlength: 20 },
    password: { type: String, required: true, trim: true},
    profileImage : { type: String, default: '', trim: true },
    isAdmin : { type : Boolean, default : false},
});

export const User = model('User', UserSchema);