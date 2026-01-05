/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { bufferCount, filter, map } from 'rxjs/operators';
import { SiteThemeActions } from '../actions/index';
import { getActiveSiteTheme } from '../selectors/site-themes.selectors';
import { StateWithSiteTheme } from '../state';

@Injectable()
export class SiteThemesEffects {
  protected actions$ = inject(Actions);
  protected state = inject(Store<StateWithSiteTheme>);

  activateSiteTheme$: Observable<SiteThemeActions.SiteThemeChange> =
    createEffect(() =>
      this.state.select(getActiveSiteTheme).pipe(
        bufferCount(2, 1),
        filter(([previous]) => !!previous),
        map(
          ([previous, current]) =>
            new SiteThemeActions.SiteThemeChange({ previous, current })
        )
      )
    );
}
