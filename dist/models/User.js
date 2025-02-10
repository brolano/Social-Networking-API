import { Schema, model } from 'mongoose';
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'User is required'],
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please enter a valid email address'
        ],
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false
});
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});
const User = model('user', userSchema);
export default User;
