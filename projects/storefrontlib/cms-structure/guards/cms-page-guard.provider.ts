import { InjectionToken } from '@angular/core';
import { CanActivateFn } from '@angular/router';

export const CX_PAGE_GUARD = new InjectionToken<CanActivateFn[]>(
  'CmsPageGuard'
);
