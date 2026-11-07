/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Observable, of } from 'rxjs';

/**
 * Methods implement the real service surface with sensible defaults; override
 * any of them per test with `vi.spyOn(service, 'method').mockReturnValue(...)`.
 */
export class MockConfiguratorStorefrontUtilsService {
  protected lastSelected:
    | { attributeName: string; valueCode: string }
    | undefined;

  isCartEntryOrGroupVisited(): Observable<boolean> {
    return of(true);
  }
  scrollToConfigurationElement(): void {}
  focusFirstAttribute(): void {}
  focusFirstActiveElement(): void {}
  focusValue(): void {}
  getPrefixId(): string | undefined {
    return undefined;
  }
  createGroupId(): string | undefined {
    return undefined;
  }
  createOvGroupId(): string | undefined {
    return undefined;
  }
  createOvMenuItemId(): string | undefined {
    return undefined;
  }
  setFocus(): void {}
  changeStyling(): void {}
  removeStyling(): void {}
  getElement(): HTMLElement | undefined {
    return undefined;
  }
  getElements(): HTMLElement[] | undefined {
    return undefined;
  }
  getVerticallyScrolledPixels(): number | undefined {
    return undefined;
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
  assembleValuesForMultiSelectAttributes(): unknown[] {
    return [];
  }
  navigateToOverviewGroup(): void {}
  focusConfigurationElement(): void {}
  focusElement(): void {}
  getClosestElement(): HTMLElement | undefined {
    return undefined;
  }
  getElementById(): HTMLElement | undefined {
    return undefined;
  }
  changeStylingOfElement(): void {}
  removeStylingOfElement(): void {}
  createAttributeUiKey(): string {
    return 'attribute-ui-key';
  }
  idSelector(id: string): string {
    return `#${id}`;
  }
  isOverviewMenuFilterTabVisible(): boolean {
    return false;
  }
  shouldHideBasePriceAndSelectedOptions(): boolean {
    return false;
  }
  setLastSelected(attributeName: string, valueCode: string): void {
    this.lastSelected = { attributeName, valueCode };
  }
  isLastSelected(attributeName: string, valueCode: string): boolean {
    return (
      !!this.lastSelected &&
      this.lastSelected.attributeName === attributeName &&
      this.lastSelected.valueCode === valueCode
    );
  }
}
