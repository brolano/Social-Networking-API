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