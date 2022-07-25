import { InjectionToken } from '@angular/core';

export const UserIdPathAllowListInjectionToken = new InjectionToken<
  Array<string>
>('Allowlist for request URLs to send the user ID with.');

export const UserIdPathAllowList = ['/products/search', '/costcenters'];
