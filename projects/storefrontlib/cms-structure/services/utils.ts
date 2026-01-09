import { CanActivate } from './guards-composer';

export function isCanActivate(guard: any): guard is CanActivate {
  return guard && typeof guard.canActivate === 'function';
}
