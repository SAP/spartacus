/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isPlatformServer } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { bufferCount, filter, map } from 'rxjs/operators';
import { SiteThemeActions } from '../actions/index';
import { getActiveSiteTheme } from '../selectors/site-themes.selectors';
import { StateWithSiteTheme } from '../state';

@Injectable()
export class SiteThemesEffects {
  protected actions$ = inject(Actions);
  private platformId = inject(PLATFORM_ID);
  protected state = inject(Store<StateWithSiteTheme>);

  activateSiteTheme$ = createEffect(() => {
    return this.state.select(getActiveSiteTheme).pipe(
      // Filter out emissions during SSR to avoid pending subscriptions
      filter(() => !isPlatformServer(this.platformId)),

      bufferCount(2, 1),
      map(
        ([previous, current]) =>
          new SiteThemeActions.SiteThemeChange({ previous, current })
      )
    );
  });
}
