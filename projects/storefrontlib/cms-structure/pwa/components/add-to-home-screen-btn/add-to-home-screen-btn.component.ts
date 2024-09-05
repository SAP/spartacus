/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { AddToHomeScreenService } from '../../services/add-to-home-screen.service';
import { AddToHomeScreenComponent } from '../add-to-home-screen.component';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
    selector: 'cx-add-to-home-screen-btn',
    templateUrl: './add-to-home-screen-btn.component.html',
    standalone: true,
    imports: [NgIf, AsyncPipe],
})
export class AddToHomeScreenBtnComponent extends AddToHomeScreenComponent {
  constructor(protected addToHomeScreenService: AddToHomeScreenService) {
    super(addToHomeScreenService);
  }
}
