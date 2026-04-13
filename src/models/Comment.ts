import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  text: string;
  user: mongoose.Types.ObjectId;
  card: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema: Schema = new Schema(
  {
    text: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 500,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    card: {
      type: Schema.Types.ObjectId,
      ref: 'Card',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Add an index to efficiently query comments by card
CommentSchema.index({ card: 1 });

export default mongoose.model<IComment>('Comment', CommentSchema);
