import { Schema, model, Document } from 'mongoose';

interface User extends Document {
    username: string;
    password: string;
    profileImage: string;
}

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true, trim: true, minlength: 3, maxlength: 20 },
    password: { type: String, required: true, trim: true},
    profileImage : { type: String, default: '', trim: true },
});

export const User = model<User>('User', UserSchema);
