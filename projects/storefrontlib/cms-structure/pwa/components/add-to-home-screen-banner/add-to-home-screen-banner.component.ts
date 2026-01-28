/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe } from '@spartacus/core';
import { AddToHomeScreenService } from '../../services/add-to-home-screen.service';
import { AddToHomeScreenComponent } from '../add-to-home-screen.component';

@Component({
  selector: 'cx-add-to-home-screen-banner',
  templateUrl: './add-to-home-screen-banner.component.html',
  imports: [NgIf, AsyncPipe, TranslatePipe],
})
export class AddToHomeScreenBannerComponent extends AddToHomeScreenComponent {
  constructor(protected addToHomeScreenService: AddToHomeScreenService) {
    super(addToHomeScreenService);
  }
}
