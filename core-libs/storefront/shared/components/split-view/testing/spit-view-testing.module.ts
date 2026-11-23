/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, NgModule, Output, input } from '@angular/core';

// PRIVATE TESTING UTIL
@Component({
  template: '<ng-content />',
  selector: 'cx-split-view',
})
export class MockSplitViewComponent {
  readonly hideMode = input(undefined);
}

@Component({
  template: '<ng-content />',
  selector: 'cx-view',
})
export class MockViewComponent {
  readonly position = input<number>();
  readonly hidden = input(undefined);
  @Output() hiddenChange;
}

const mockComponents = [MockSplitViewComponent, MockViewComponent];

@NgModule({
  imports: [...mockComponents],
  exports: mockComponents,
})
export class SplitViewTestingModule {}
