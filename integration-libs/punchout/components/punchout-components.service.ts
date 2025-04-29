/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable, RendererFactory2 } from '@angular/core';
import { AuthService } from '@spartacus/core';
import { PunchoutStoreService } from '@spartacus/punchout/root';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { RootDomService } from '@spartacus/storefront';

@Injectable()
export class PunchoutComponentsService {
  private rendererFactory = inject(RendererFactory2); // private, because needed only to create a renderer
  protected punchoutStoreService = inject(PunchoutStoreService);
  protected authService = inject(AuthService);
  protected rootDomService = inject(RootDomService);

  protected readonly CSS_FEATURE_FLAG_CLASS = 'cxPunchoutSessionActive';
  protected renderer = this.rendererFactory.createRenderer(null, null);
  protected rootElement: HTMLElement | undefined;

  constructor() {
    this.rootDomService
      .getRootElement()
      .pipe(
        tap((el) => (this.rootElement = el)),
        withLatestFrom(this.isPunchoutSessionActive()),
        tap(([_root, isActive]) => this.updateClass(isActive))
      )
      .subscribe();
  }
  isPunchoutSessionActive(): Observable<boolean> {
    return this.authService.isUserLoggedIn().pipe(
      switchMap((isLoggedIn) => {
        return isLoggedIn
          ? this.punchoutStoreService.getPunchoutState()
          : of({ punchoutSessionId: undefined });
      }),
      map((punchoutState) => {
        return !!punchoutState.punchoutSessionId;
      })
    );
  }

  protected updateClass(punchoutActive: boolean) {
    console.log(punchoutActive, this.rootElement);
    if (!this.rootElement) {
      return;
    }
    if (punchoutActive) {
      this.renderer.addClass(this.rootElement, this.CSS_FEATURE_FLAG_CLASS);
    } else {
      this.renderer.removeClass(this.rootElement, this.CSS_FEATURE_FLAG_CLASS);
    }
  }
}
