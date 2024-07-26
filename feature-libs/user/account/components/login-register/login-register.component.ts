/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit, Optional, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseSite, BaseSiteService, RoutingService } from '@spartacus/core';
import { filter, map, Observable, take } from 'rxjs';

@Component({
  selector: 'cx-login-register',
  templateUrl: './login-register.component.html',
})
export class LoginRegisterComponent implements OnInit {
  loginAsGuest = false;
  registerEnabled$: Observable<boolean> | undefined;

  @Optional() protected routingService = inject(RoutingService, {
    optional: true,
  });

  @Optional() protected baseSiteService = inject(BaseSiteService, {
    optional: true,
  });
  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.loginAsGuest = this.activatedRoute.snapshot.queryParams['forced'];
    this.registerEnabled$ = this.baseSiteService?.get().pipe(
      filter((site) => site != null),
      take(1),
      map((baseSite: BaseSite) => Boolean(baseSite?.registrationEnabled))
    );
  }

  navigateTo(cxRoute: string): void {
    this.routingService?.go({ cxRoute });
  }
}
