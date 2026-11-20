/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Configurator } from '../../../core/model/configurator.model';
import { ConfiguratorStorefrontUtilsService } from '../configurator-storefront-utils.service';

/**
 * Mock of {@link ConfiguratorStorefrontUtilsService} for unit tests.
 *
 * Methods return sensible defaults; override any of them per test with
 * `vi.spyOn(service, 'method').mockReturnValue(...)`.
 */
@Injectable()
export class MockConfiguratorStorefrontUtilsService
  implements Partial<ConfiguratorStorefrontUtilsService>
{
  isCartEntryOrGroupVisited(): Observable<boolean> {
    return of(false);
  }

  assembleValuesForMultiSelectAttributes(): Configurator.Value[] {
    return [];
  }

  scrollToConfigurationElement(): void {}

  navigateToOverviewGroup(): void {}

  focusConfigurationElement(): void {}

  focusFirstAttribute(): void {}

  focusFirstActiveElement(): void {}

  focusElement(): void {}

  createAttributeUiKey(): string {
    return '';
  }

  focusValue(): void {}

  getPrefixId(): string {
    return '';
  }

  createGroupId(): string | undefined {
    return undefined;
  }

  createOvGroupId(): string {
    return '';
  }

  createOvMenuItemId(): string {
    return '';
  }

  setFocus(): void {}

  changeStyling(): void {}

  changeStylingOfElement(): void {}

  removeStyling(): void {}

  removeStylingOfElement(): void {}

  getClosestElement(): HTMLElement | undefined {
    return undefined;
  }

  idSelector(): string {
    return '';
  }

  getElement(): HTMLElement | undefined {
    return undefined;
  }

  getElementById(): HTMLElement | undefined {
    return undefined;
  }

  getElements(): HTMLElement[] | undefined {
    return [];
  }

  getVerticallyScrolledPixels(): number | undefined {
    return 0;
  }

  hasScrollbar(): boolean {
    return false;
  }

  getHeight(): number {
    return 0;
  }

  getSpareViewportHeight(): number {
    return 0;
  }

  ensureElementVisible(): void {}

  isDisplayOnlyVariant(): Observable<boolean> {
    return of(false);
  }

  isDisplayOnly(): boolean {
    return false;
  }

  setLastSelected(): void {}

  isLastSelected(): boolean {
    return false;
  }

  isOverviewMenuFilterTabVisible(): boolean {
    return false;
  }

  shouldHideBasePriceAndSelectedOptions(): boolean {
    return false;
  }
}
