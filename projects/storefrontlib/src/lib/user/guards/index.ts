import { AuthGuard } from './auth.guard';
import { NotAuthGuard } from './not-auth.guard';

export const guards: any[] = [AuthGuard, NotAuthGuard];

export * from './auth.guard';
export * from './not-auth.guard';
