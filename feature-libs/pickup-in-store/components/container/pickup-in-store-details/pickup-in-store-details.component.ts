/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'cx-pick-up-in-store-details',
  templateUrl: 'pickup-in-store-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PickUpInStoreDetailsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
