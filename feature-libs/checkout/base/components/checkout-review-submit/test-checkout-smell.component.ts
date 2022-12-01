/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cx-test-checkout-smell',
  templateUrl: './test-checkout-smell.component.html',
})
export class TestCheckoutSmellComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.callCodeSmell();
  }

  private callCodeSmell(): boolean {
    if (true) {
      return true;
    }
  }
}
