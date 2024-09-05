/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, NgModule } from '@angular/core';

@Component({
    selector: 'cx-org-message',
    template: '',
    standalone: true,
})
class MessageComponent {}

@NgModule({
    imports: [MessageComponent],
    exports: [MessageComponent],
})
export class MessageTestingModule {}
