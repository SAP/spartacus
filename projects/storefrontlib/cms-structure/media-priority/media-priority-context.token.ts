/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MediaPriorityContext } from './media-priority-context.model';

export const DEFAULT_MEDIA_PRIORITY_CONTEXT: MediaPriorityContext = {
  fetchPriority: undefined,
};

export const MEDIA_PRIORITY_CONTEXT = new InjectionToken<
  Observable<MediaPriorityContext>
>('MEDIA_PRIORITY_CONTEXT', {
  providedIn: 'root',
  factory: () => of(DEFAULT_MEDIA_PRIORITY_CONTEXT),
});
