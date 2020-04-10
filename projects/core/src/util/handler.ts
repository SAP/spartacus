export enum Priority {
  FALLBACK = -10,
  LOW = -5,
  NORMAL = 0,
  HIGH = 5,
}

export interface MatchHandler {
  hasMatch(...params): boolean;
}

export interface PriorityHandler {
  getPriority(...params): Priority | number;
}
