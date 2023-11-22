import { InjectionToken } from "@angular/core";

export const USE_MY_ACCOUNT_V2_PASSWORD = new InjectionToken<boolean>(
    'feature flag to enable enhanced UI for Update Password related pages under My-Account',
    { providedIn: 'root', factory: () => false }
  );
