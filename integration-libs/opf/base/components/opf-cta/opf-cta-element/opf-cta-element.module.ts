/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SafeHtmlModule } from '@spartacus/storefront';
import { OpfCtaElementComponent } from './opf-cta-element.component';

@NgModule({
  declarations: [OpfCtaElementComponent],
  imports: [CommonModule, SafeHtmlModule],
  exports: [OpfCtaElementComponent],
})
export class OpfCtaElementModule {}
