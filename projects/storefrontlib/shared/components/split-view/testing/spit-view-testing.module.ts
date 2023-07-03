/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input, NgModule, Output } from '@angular/core';

// PRIVATE TESTING UTIL
@Component({
  template: '<ng-content></ng-content>',
  selector: 'cx-split-view',
})
export class MockSplitViewComponent {
  @Input() hideMode;
}

@Component({
  template: '<ng-content></ng-content>',
  selector: 'cx-view',
})
export class MockViewComponent {
  @Input() position: number;
  @Input() hidden;
  @Output() hiddenChange;
}

const mockComponents = [MockSplitViewComponent, MockViewComponent];

@NgModule({
  declarations: mockComponents,
  exports: mockComponents,
})
export class SplitViewTestingModule {}
