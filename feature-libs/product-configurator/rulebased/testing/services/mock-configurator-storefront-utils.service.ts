/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { of } from 'rxjs';
import { vi } from 'vitest';

/** Mock: ConfiguratorStorefrontUtilsService provides focus, scroll, styling, and last-selected helpers. */
export class MockConfiguratorStorefrontUtilsService {
  protected lastSelected:
    | { attributeName: string; valueCode: string }
    | undefined;

  isCartEntryOrGroupVisited = vi.fn().mockReturnValue(of(true));
  scrollToConfigurationElement = vi.fn();
  focusFirstAttribute = vi.fn();
  focusFirstActiveElement = vi.fn();
  focusValue = vi.fn();
  getPrefixId = vi.fn();
  createGroupId = vi.fn();
  createOvGroupId = vi.fn();
  createOvMenuItemId = vi.fn();
  setFocus = vi.fn();
  changeStyling = vi.fn();
  removeStyling = vi.fn();
  getElement = vi.fn().mockReturnValue(undefined);
  getElements = vi.fn().mockReturnValue(undefined);
  getVerticallyScrolledPixels = vi.fn().mockReturnValue(undefined);
  hasScrollbar = vi.fn().mockReturnValue(false);
  getHeight = vi.fn().mockReturnValue(0);
  getSpareViewportHeight = vi.fn().mockReturnValue(0);
  ensureElementVisible = vi.fn();
  isDisplayOnlyVariant = vi.fn().mockReturnValue(of(false));
  assembleValuesForMultiSelectAttributes = vi.fn().mockReturnValue([]);
  navigateToOverviewGroup = vi.fn();
  focusConfigurationElement = vi.fn();
  focusElement = vi.fn();
  getClosestElement = vi.fn();
  getElementById = vi.fn();
  changeStylingOfElement = vi.fn();
  removeStylingOfElement = vi.fn();
  createAttributeUiKey = vi.fn().mockReturnValue('attribute-ui-key');
  idSelector = vi.fn().mockImplementation((id: string) => `#${id}`);
  isOverviewMenuFilterTabVisible = vi.fn().mockReturnValue(false);
  shouldHideBasePriceAndSelectedOptions = vi.fn().mockReturnValue(false);
  setLastSelected = vi
    .fn()
    .mockImplementation((attributeName: string, valueCode: string) => {
      this.lastSelected = { attributeName, valueCode };
    });
  isLastSelected = vi
    .fn()
    .mockImplementation(
      (attributeName: string, valueCode: string) =>
        !!this.lastSelected &&
        this.lastSelected.attributeName === attributeName &&
        this.lastSelected.valueCode === valueCode
    );
}
