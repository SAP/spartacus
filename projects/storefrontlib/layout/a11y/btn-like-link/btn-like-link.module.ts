/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BtnLikeLinkDirective } from './btn-like-link.directive';

const directives = [BtnLikeLinkDirective];

@NgModule({
  imports: [CommonModule],
  declarations: [...directives],
  exports: [...directives],
})
export class BtnLikeLinkModule {}
