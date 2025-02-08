import { Schema, model, Document, Types } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    thoughts: Types.ObjectId[];
    friends: Types.ObjectId[];
}

const userSchema = new Schema<IUser>(
    {
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
        },
        {
            timestamps: true,
            toJSON: {
                virtuals: true,
                getters: true,
            },
            id: false
        }
    )

    userSchema.virtual('friendCount').get(function() {
        return this.friends.length;
    });

    userSchema.pre('save', function(next) {
        if (this.username) {
            this.username = this.username.trim();
        }
        next();
    });

    userSchema.methods.addFriend = async function(friendId: Types.ObjectId) {
        if (!this.friends.includes(friendId)) {
          this.friends.push(friendId);
          await this.save();
        }
        return this;
      };
      
      userSchema.methods.removeFriend = async function(friendId: Types.ObjectId) {
        if (this.friends.includes(friendId)) {
          this.friends = this.friends.filter((id: { equals: (arg0: Types.ObjectId) => any; }) => !id.equals(friendId));
          await this.save();
        }
        return this;
      };
      
      export const User = model<IUser>('User', userSchema);