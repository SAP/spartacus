/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Temporarily removes elements from the tabbing flow and restores them after a tick.
 *
 * This method sets the `tabIndex` of each element in the provided iterable to `-1`
 * and resets it back to `0` using `requestAnimationFrame`. While using `requestAnimationFrame`
 * may seem like a bad code smell, it is justified here as it ensures a natural tabbing flow
 * in cases where determining the next focusable element is complex, such as when directives
 * like `TrapFocusDirective` modify the DOM's focus behavior.
 *
 * This utility is especially useful for scenarios like menus, lists, or carousels where
 * `Tab` navigation is intentionally disabled, but other keyboard keys (e.g., `Arrow` keys)
 * are used for navigation. It helps prevent these elements from disrupting the tab order
 * while allowing other key-based interactions.
 *
 * @param elements - An iterable of `HTMLElement` objects to temporarily remove from tab navigation.
 */
export const disableTabbingForTick = (elements: Iterable<HTMLElement>) => {
  for (const element of elements) {
    element.tabIndex = -1;
  }
  requestAnimationFrame(() => {
    for (const element of elements) {
      element.tabIndex = 0;
    }
  });
};
