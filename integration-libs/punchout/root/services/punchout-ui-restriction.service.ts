/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ComponentRef,
  inject,
  Injectable,
  RendererFactory2,
} from '@angular/core';
import { AuthService } from '@spartacus/core';
import { PunchoutStoreService } from './punchout-store.service';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class PunchoutUiRestrictionService {
  private rendererFactory = inject(RendererFactory2); // private, because needed only to create a renderer
  protected punchoutStoreService = inject(PunchoutStoreService);
  protected authService = inject(AuthService);

  protected readonly CSS_PUNCHOUT_SESSION_CLASS = 'cxPunchoutSessionActive';
  protected renderer = this.rendererFactory.createRenderer(null, null);
  protected rootElement: HTMLElement | undefined;

  isPunchoutSessionActive(): Observable<boolean> {
    return this.authService.isUserLoggedIn().pipe(
      switchMap((isLoggedIn) => {
        return isLoggedIn
          ? this.punchoutStoreService.getPunchoutState()
          : of({ punchoutSessionId: undefined });
      }),
      map((punchoutState) => {
        return !!punchoutState.punchoutSessionId;
      }),
      tap((punchoutActive) => this.updateClass(punchoutActive))
    );
  }

  protected updateClass(punchoutActive: boolean) {
    if (!this.rootElement) {
      return;
    }
    if (punchoutActive) {
      this.renderer.addClass(this.rootElement, this.CSS_PUNCHOUT_SESSION_CLASS);
    } else {
      this.renderer.removeClass(
        this.rootElement,
        this.CSS_PUNCHOUT_SESSION_CLASS
      );
    }
  }

  init(rootComponent: ComponentRef<any>) {
    this.rootElement = rootComponent.location.nativeElement;
  }
}
