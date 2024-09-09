/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit, Optional, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RoutingService, FeaturesConfigModule, UrlModule, I18nModule } from '@spartacus/core';
import { NgClass, NgIf } from '@angular/common';

@Component({
    selector: 'cx-login-register',
    templateUrl: './login-register.component.html',
    standalone: true,
    imports: [
        FeaturesConfigModule,
        NgClass,
        NgIf,
        RouterLink,
        UrlModule,
        I18nModule,
    ],
})
export class LoginRegisterComponent implements OnInit {
  loginAsGuest = false;

  @Optional() protected routingService = inject(RoutingService, {
    optional: true,
  });

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.loginAsGuest = this.activatedRoute.snapshot.queryParams['forced'];
  }

  navigateTo(cxRoute: string): void {
    this.routingService?.go({ cxRoute });
  }
}
