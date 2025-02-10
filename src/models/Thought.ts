import { Schema, model, Document } from 'mongoose';
import Reaction from './Reaction.js'


interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: typeof Reaction[];
}


const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: [true, 'Thought text is required'],
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: (value: any) => {
              return value.toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
              });
            }
        },
        username: {
            type: String,
            required: [true, 'Username is required']
        },
        reactions: [Reaction],
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
});

const Thought = model('Thought', thoughtSchema);

export default Thought;