/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { AddToHomeScreenService } from '../../services/add-to-home-screen.service';
import { AddToHomeScreenComponent } from '../add-to-home-screen.component';
import { I18nModule } from '@spartacus/core';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
    selector: 'cx-add-to-home-screen-banner',
    templateUrl: './add-to-home-screen-banner.component.html',
    standalone: true,
    imports: [
        NgIf,
        AsyncPipe,
        I18nModule,
    ],
})
export class AddToHomeScreenBannerComponent extends AddToHomeScreenComponent {
  constructor(protected addToHomeScreenService: AddToHomeScreenService) {
    super(addToHomeScreenService);
  }
}
