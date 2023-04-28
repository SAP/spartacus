/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { ConsentTemplate } from '@spartacus/core';
import { OutletContextData } from '@spartacus/storefront';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cx-cdc-consent-management-document',
  templateUrl: './cdc-site-consent.html',
})
export class CdcSiteConsentComponent implements OnInit, OnDestroy {
  consentTemplate: ConsentTemplate;
  protected subscription = new Subscription();
  constructor(@Optional() protected outlet?: OutletContextData<any>) {}
  ngOnInit(): void {
    if (this.outlet?.context$) {
      this.subscription.add(
        this.outlet.context$.subscribe(
          (context) => (this.consentTemplate = context)
        )
      );
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
