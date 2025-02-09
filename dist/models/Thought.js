import { Schema, model } from 'mongoose';
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: [true, 'Thought text is required'],
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => timestamp.toLocaleString()
    },
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    reactions: [{ type: Schema.Types.ObjectId, ref: 'Reaction' }],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
export const Thought = model('Thought', thoughtSchema);
