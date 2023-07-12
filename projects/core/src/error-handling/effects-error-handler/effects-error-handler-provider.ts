/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { EFFECTS_ERROR_HANDLER } from '@ngrx/effects';
import { cxEffectsErrorHandler } from './cx-effects-error-handler';
import { EffectsErrorHandlerService } from './effects-error-handler.service';

export const effectErrorHandlerProviders = [
  {
    provide: EFFECTS_ERROR_HANDLER,
    useValue: cxEffectsErrorHandler,
  },
  EffectsErrorHandlerService,
];
