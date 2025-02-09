import { Schema, Types, Document, ObjectId } from 'mongoose';

// First, let's define a dedicated interface for reactions
interface IReaction extends Document {
  reactionId: ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}

// Create the reaction schema
const reactionSchema = new Schema<IReaction>(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: { 
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp: Date) => timestamp.toLocaleString()
    }
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  });

export default reactionSchema;