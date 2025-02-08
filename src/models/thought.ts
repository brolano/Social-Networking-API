const { Schema, model } = require ('mongoose');

const thoughtSchema = new Schema({
    thoughtText: { type: String, required: true, minlength: 1, maxlength: 200},
    createdAt: { type: Date, default: Date.now, get: timestamp => new Date(timestamp).toLocaleString() },
    username: { type: String, required: true },
    reactions: [{ type: Schema.Types.ObjectId, ref: 'Reaction' }],
}, {
    toJSON: { virtuals: true, getters: true },
    id: false
});

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;