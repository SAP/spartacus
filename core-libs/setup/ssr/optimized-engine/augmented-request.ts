export {};

declare global {
  namespace Express {
    export interface Request {
      uuid?: string; // request uuid for debug tracking
    }
  }
}
