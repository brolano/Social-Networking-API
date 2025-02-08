import { Schema, model, Document, Types } from 'mongoose';

interface IReaction extends Document {
    reactionId: Types.ObjectId;
    reactionBody: string;
    username: string;
    createdAt: Date;
}

interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: IReaction[];
    reactionCount: number;
}

const reactionSchema = new Schema<IReaction>(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: [true, 'Reaction text is required'],
            maxlength: 280
        },
        username: {
            type: String,
            required: [true, 'Username is required']
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: [true, 'Thought text is required'],
            minlength: 1,
            maxlength: 280
        },
        username: {
            type: String,
            required: [true, 'Username is required']
        },
        reactions: [reactionSchema]
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
};)

thoughtSchema.post('save', async function(doc) {
    try {
        const { User } = require('./user.model');
        await User.findOneandUpdate(
            { username: doc.username },
            { $addToSet: { thoughts: doc._id } }
        );
    } catch (err) {
        console.error('Error updating user thoughts:', err);
    }
});

thoughtSchema.post('remove', async function(doc) {
    try {
        const { User } = require('.user.model');
        await User.findOneAndUpdate(
            { username: doc.username },
            { $pull: { thoughts:doc._id } }
        );
    } catch (err) {
        console.error('Error cleaning up user thoughts:', err);
    }
});

thoughtSchema.methods.addReaction = async function(reactionData: Partial<IReaction>) {
    this.reactions.push(reactionData);
    return this.save();
};

thoughtSchema.methods.removeReaction = async function(reactionId: Types.ObjectId) {
    this.reactions = this.reactions.filter(
        reaction => !reaction.reactionId.equals(reactionId)
    );
    return this.save();
};

export const Thought = model<IThought>('Thought', thoughtSchema);