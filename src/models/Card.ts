import mongoose, { Schema, Document } from 'mongoose';

export interface ICard extends Document {
  title: string;
  description?: string;
  board: mongoose.Types.ObjectId;
  assignedTo?: mongoose.Types.ObjectId;
  status: 'todo' | 'in-progress' | 'done';
  dueDate?: Date;
  position: number;
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CardSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 100,
    },
    description: {
      type: String,
      maxlength: 1000,
    },
    board: {
      type: Schema.Types.ObjectId,
      ref: 'Board',
      required: true,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['todo', 'in-progress', 'done'],
      default: 'todo',
    },
    dueDate: {
      type: Date,
    },
    position: {
      type: Number,
      required: true,
    },
    archived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Add an index to efficiently query cards by board and position
CardSchema.index({ board: 1, position: 1 });

export default mongoose.model<ICard>('Card', CardSchema);
