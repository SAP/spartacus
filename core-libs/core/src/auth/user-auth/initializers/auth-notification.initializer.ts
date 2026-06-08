/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject } from '@angular/core';
import { FeatureToggles } from '../../../features-config/feature-toggles';
import { AuthNotificationService } from '../facade/auth-notification.service';

/**
 * Calls the listen function to initialize the service.
 */
export const authNotificationInitializer = () => {
  if (inject(FeatureToggles).propagateLogoutToAllTabs) {
    inject(AuthNotificationService).listen();
  }
};
