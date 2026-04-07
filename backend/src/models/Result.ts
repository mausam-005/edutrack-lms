import mongoose, { Schema, Document } from 'mongoose';

export interface IResult extends Document {
  student: mongoose.Types.ObjectId;
  quiz: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  answers: number[];
  score: number;
  totalQuestions: number;
  submittedAt: Date;
}

const resultSchema = new Schema<IResult>(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    quiz: {
      type: Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    answers: {
      type: [Number],
      required: true,
    },
    score: {
      type: Number,
      required: true,
      min: 0,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// One attempt per student per quiz
resultSchema.index({ student: 1, quiz: 1 }, { unique: true });

export const Result = mongoose.model<IResult>('Result', resultSchema);
