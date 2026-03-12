/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe } from '@spartacus/core';

@Component({
  selector: 'cx-opf-tokenisation-new-payments-heading',
  standalone: true,
  templateUrl: './opf-tokenisation-new-payments-heading.component.html',
  imports: [NgIf, TranslatePipe],
})
export class OpfTokenisationNewPaymentsHeadingComponent {}
