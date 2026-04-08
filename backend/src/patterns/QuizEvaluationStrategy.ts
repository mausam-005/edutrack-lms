import { IQuizEvaluationStrategy } from '../interfaces/IQuizService';
export class StandardEvaluation implements IQuizEvaluationStrategy {
  evaluate(
    answers: number[],
    correctAnswers: number[]
  ): { score: number; totalQuestions: number; percentage: number } {
    let score = 0;
    answers.forEach((answer, index) => {
      if (answer === correctAnswers[index]) {
        score++;
      }
    });
    const totalQuestions = correctAnswers.length;
    const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
    return { score, totalQuestions, percentage };
  }
  getStrategyName(): string {
    return 'Standard Evaluation';
  }
}
export class WeightedEvaluation implements IQuizEvaluationStrategy {
  evaluate(
    answers: number[],
    correctAnswers: number[]
  ): { score: number; totalQuestions: number; percentage: number } {
    let score = 0;
    let maxScore = 0;
    answers.forEach((answer, index) => {
      const weight = index + 1;
      maxScore += weight;
      if (answer === correctAnswers[index]) {
        score += weight;
      }
    });
    const totalQuestions = correctAnswers.length;
    const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
    return { score, totalQuestions, percentage };
  }
  getStrategyName(): string {
    return 'Weighted Evaluation';
  }
}
export class PenaltyEvaluation implements IQuizEvaluationStrategy {
  private readonly penaltyFactor: number;
  constructor(penaltyFactor: number = 0.25) {
    this.penaltyFactor = penaltyFactor;
  }
  evaluate(
    answers: number[],
    correctAnswers: number[]
  ): { score: number; totalQuestions: number; percentage: number } {
    let rawScore = 0;
    answers.forEach((answer, index) => {
      if (answer === correctAnswers[index]) {
        rawScore += 1;
      } else if (answer !== -1) {
        rawScore -= this.penaltyFactor;
      }
    });
    const score = Math.max(0, Math.round(rawScore));
    const totalQuestions = correctAnswers.length;
    const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
    return { score, totalQuestions, percentage };
  }
  getStrategyName(): string {
    return `Penalty Evaluation (${this.penaltyFactor}x)`;
  }
}
export class EvaluationStrategyFactory {
  private static strategies: Map<string, IQuizEvaluationStrategy> = new Map();
  static {
    EvaluationStrategyFactory.register('standard', new StandardEvaluation());
    EvaluationStrategyFactory.register('weighted', new WeightedEvaluation());
    EvaluationStrategyFactory.register('penalty', new PenaltyEvaluation());
  }
  static register(name: string, strategy: IQuizEvaluationStrategy): void {
    this.strategies.set(name, strategy);
  }
  static getStrategy(name: string = 'standard'): IQuizEvaluationStrategy {
    const strategy = this.strategies.get(name);
    if (!strategy) {
      return new StandardEvaluation();
    }
    return strategy;
  }
  static getAvailableStrategies(): string[] {
    return Array.from(this.strategies.keys());
  }
}
