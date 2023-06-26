/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, Type } from '@angular/core';
import { SegmentModule } from '@spartacus/segment';
import { PersonalizationModule } from '@spartacus/tracking/personalization';
import { environment } from '../../../../environments/environment';

const extensions: Type<any>[] = [];

if (environment.segment) {
  extensions.push(SegmentModule);
}
@NgModule({
  imports: [PersonalizationModule, ...extensions],
})
export class PersonalizationWrapperModule {}
