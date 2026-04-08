import { IQuiz } from '../models/Quiz';
import { IResult } from '../models/Result';
import { IBaseRepository } from './IBaseRepository';
export interface IQuizRepository extends IBaseRepository<IQuiz> {
  findByCourse(courseId: string): Promise<IQuiz[]>;
}
export interface IResultRepository extends IBaseRepository<IResult> {
  findByStudentAndQuiz(studentId: string, quizId: string): Promise<IResult | null>;
  findByQuiz(quizId: string): Promise<IResult[]>;
  findByStudent(studentId: string): Promise<IResult[]>;
  findByQuizWithStudentDetails(quizId: string): Promise<IResult[]>;
}
