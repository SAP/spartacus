export enum Priority {
  FALLBACK = -10,
  LOW = -5,
  NORMAL = 0,
  HIGH = 5,
}

export interface Handler {
  hasMatch?(...params): boolean;
  getPriority?(...params): Priority | number;
}
