import mongoose from 'mongoose';
import { mongoSchemaOptions } from '../utilities/constants.js';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
        name: { type: String },
        email: {
            type: String,
        },
        password: { type: String },
        dob: {
            type: Date
        },
        gender: {
            type: String,
            enum: ['male', 'female', 'other']
        },
        phone_number: {
            type: String,
            unique: true,
            required: true
        },
        dial_code: {
            type: String,
        },
        role: {
            type: String,
            enum: ['user', 'admin', 'vendor'],
            default: 'user'
        },
        is_active: {
            type: Boolean,
            default: true
        },
        is_profile_updated: {
            type: Boolean,
            default: false
        },
        is_mobile_verified: {
            type: Boolean,
            default: false
        },
        is_email_verified: {
            type: Boolean,
            default: false
        },
        createdAt: { type: Date, default: Date.now },
    },
    mongoSchemaOptions
);


export default UserSchema;