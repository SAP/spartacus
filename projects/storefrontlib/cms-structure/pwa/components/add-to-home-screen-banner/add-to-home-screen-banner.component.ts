/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { AddToHomeScreenService } from '../../services/add-to-home-screen.service';
import { AddToHomeScreenComponent } from '../add-to-home-screen.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { TranslatePipe } from '../../../../../core/src/i18n/translate.pipe';
import { MockTranslatePipe } from '../../../../../core/src/i18n/testing/mock-translate.pipe';

@Component({
    selector: 'cx-add-to-home-screen-banner',
    templateUrl: './add-to-home-screen-banner.component.html',
    imports: [
        NgIf,
        AsyncPipe,
        TranslatePipe,
        MockTranslatePipe,
    ],
})
export class AddToHomeScreenBannerComponent extends AddToHomeScreenComponent {
  constructor(protected addToHomeScreenService: AddToHomeScreenService) {
    super(addToHomeScreenService);
  }
}
