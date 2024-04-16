/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BannerComponent} from "./banner.directive";

@Component({
  selector: 'cx-banner',
  templateUrl: './banner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CxBannerComponent extends BannerComponent{

}
