import { Schema, Types } from 'mongoose';
import { IReaction } from '../interfaces/reaction.interface';

// First, let's define a dedicated interface for reactions
export interface IReaction {
  reactionId: Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}

// Create the reaction schema
export const reactionSchema = new Schema<IReaction>(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: [true, 'Reaction text is required'],
      maxlength: [280, 'Reaction must be 280 characters or less']
    },
    username: {
      type: String,
      required: [true, 'Username is required']
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
  }
);

// Add any schema methods or pre/post middleware if needed
reactionSchema.pre('save', function(next) {
  // Ensure reactionBody is trimmed
  if (this.reactionBody) {
    this.reactionBody = this.reactionBody.trim();
  }
  next();
});