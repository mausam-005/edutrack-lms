export type EventHandler = (data: any) => void | Promise<void>;
export interface IEventBus {
  subscribe(event: string, handler: EventHandler): void;
  unsubscribe(event: string, handler: EventHandler): void;
  publish(event: string, data: any): Promise<void>;
}
export enum AppEvents {
  USER_REGISTERED = 'user:registered',
  USER_LOGGED_IN = 'user:logged_in',
  COURSE_CREATED = 'course:created',
  COURSE_DELETED = 'course:deleted',
  STUDENT_ENROLLED = 'student:enrolled',
  QUIZ_CREATED = 'quiz:created',
  QUIZ_ATTEMPTED = 'quiz:attempted',
  MATERIAL_ADDED = 'material:added',
}
export class EventBus implements IEventBus {
  private static instance: EventBus;
  private handlers: Map<string, Set<EventHandler>>;
  private constructor() {
    this.handlers = new Map();
  }
  public static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }
  subscribe(event: string, handler: EventHandler): void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set());
    }
    this.handlers.get(event)!.add(handler);
  }
  unsubscribe(event: string, handler: EventHandler): void {
    const eventHandlers = this.handlers.get(event);
    if (eventHandlers) {
      eventHandlers.delete(handler);
    }
  }
  async publish(event: string, data: any): Promise<void> {
    const eventHandlers = this.handlers.get(event);
    if (!eventHandlers) return;
    const promises = Array.from(eventHandlers).map(async (handler) => {
      try {
        await handler(data);
      } catch (error) {
        console.error(`[EventBus] Error in handler for "${event}":`, error);
      }
    });
    await Promise.allSettled(promises);
  }
  getSubscriberCount(event: string): number {
    return this.handlers.get(event)?.size || 0;
  }
}
export const eventBus = EventBus.getInstance();
