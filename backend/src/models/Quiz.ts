import mongoose, { Schema, Document } from 'mongoose';
export interface IQuestion {
  questionText: string;
  options: string[];
  correctAnswer: number;
}
export interface IQuiz extends Document {
  course: mongoose.Types.ObjectId;
  title: string;
  questions: IQuestion[];
  duration: number;
  createdAt: Date;
}
const questionSchema = new Schema<IQuestion>(
  {
    questionText: {
      type: String,
      required: [true, 'Question text is required'],
    },
    options: {
      type: [String],
      validate: {
        validator: (v: string[]) => v.length >= 2 && v.length <= 6,
        message: 'A question must have between 2 and 6 options',
      },
      required: true,
    },
    correctAnswer: {
      type: Number,
      required: [true, 'Correct answer index is required'],
      min: 0,
    },
  },
  { _id: false }
);
const quizSchema = new Schema<IQuiz>(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Quiz title is required'],
      trim: true,
    },
    questions: {
      type: [questionSchema],
      validate: {
        validator: (v: IQuestion[]) => v.length > 0,
        message: 'A quiz must have at least one question',
      },
    },
    duration: {
      type: Number,
      default: 30,
      min: [1, 'Duration must be at least 1 minute'],
    },
  },
  {
    timestamps: true,
  }
);
export const Quiz = mongoose.model<IQuiz>('Quiz', quizSchema);
