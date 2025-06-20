/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Directive, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MediaPriorityContext } from './media-priority-context.model';
import {
  DEFAULT_MEDIA_PRIORITY_CONTEXT,
  MEDIA_PRIORITY_CONTEXT,
} from './media-priority-context.token';

@Directive({
  selector: '[cxMediaPriorityContext]',
  providers: [
    {
      provide: MEDIA_PRIORITY_CONTEXT,
      useFactory: (dir: MediaPriorityContextDirective) => dir.context$,
      deps: [MediaPriorityContextDirective],
    },
  ],
  standalone: false,
})
export class MediaPriorityContextDirective {
  @Input('cxMediaPriorityContext')
  set context(value: MediaPriorityContext | null) {
    this._context$.next(value ?? DEFAULT_MEDIA_PRIORITY_CONTEXT);
  }

  protected _context$ = new BehaviorSubject<MediaPriorityContext>(
    DEFAULT_MEDIA_PRIORITY_CONTEXT
  );

  public readonly context$ = this._context$.asObservable();
}
