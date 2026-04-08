import mongoose, { Schema, Document } from 'mongoose';
export interface IMaterial extends Document {
  course: mongoose.Types.ObjectId;
  title: string;
  type: 'pdf' | 'link' | 'text';
  content: string;
  order: number;
  createdAt: Date;
}
const materialSchema = new Schema<IMaterial>(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Material title is required'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['pdf', 'link', 'text'],
      required: [true, 'Material type is required'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
materialSchema.index({ course: 1, order: 1 });
export const Material = mongoose.model<IMaterial>('Material', materialSchema);
