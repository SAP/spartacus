/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
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

/**
 * Options for {@link handleLinearKeydown}. All keys are opt-in: only the
 * behaviours whose callbacks are provided will be handled.
 */
export interface LinearKeydownOptions {
  /**
   * Called when `ArrowDown` is pressed and a next item exists.
   * Receive the zero-based index of the item that will receive focus.
   */
  onNext?: (nextIndex: number) => void;
  /**
   * Called when `ArrowUp` is pressed and a previous item exists.
   * Receive the zero-based index of the item that will receive focus.
   */
  onPrevious?: (prevIndex: number) => void;
  /**
   * Called when `Home` is pressed. Defaults to focusing `items[0]`
   * when not provided but `onNext`/`onPrevious` are.
   * Override to add side-effects (e.g. scroll, announce).
   */
  onFirst?: () => void;
  /**
   * Called when `End` is pressed. Defaults to focusing `items[last]`
   * when not provided but `onNext`/`onPrevious` are.
   * Override to add side-effects (e.g. scroll, announce).
   */
  onLast?: () => void;
  /**
   * Called when `Enter` or `Space` is pressed on the focused item —
   * i.e. the primary action for that item. Provide this for composite
   * widgets whose items are not native buttons or links (those already
   * activate on Space/Enter without extra handling).
   */
  onActivate?: () => void;
}

/**
 * Handles keyboard navigation for a **linear list** of focusable items —
 * rows in a table, entries in a listbox, cards in a grid row, facet values,
 * etc. — following the ARIA Authoring Practices Guide (APG) for
 * [composite widgets](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/).
 *
 * ---
 * ### What standard this implements
 *
 * WCAG 2.1 SC 2.1.1 (Keyboard, Level A) requires that all functionality is
 * operable by keyboard. For _composite widgets_ (grid, listbox, tree, toolbar)
 * the APG specifies a **roving-tabindex** or **sequential-focus** pattern where:
 *
 * - The widget as a whole receives a single Tab stop.
 * - `ArrowDown` / `ArrowUp` move focus within the widget.
 * - `Home` / `End` jump to the first / last item.
 * - `Enter` / `Space` activate the focused item (for non-native-button items).
 * - All of the above call `event.preventDefault()` to suppress default
 *   browser scroll or form submission behaviour.
 *
 * Items that are already native `<button>` or `<a>` elements activate on
 * `Enter`/`Space` automatically; only provide `onActivate` for host elements
 * such as `<tr>`, `<li>`, `<tbody>`, or `<td>` that carry a custom click
 * handler but are not interactive by default.
 *
 * ---
 * ### Important implementation notes
 *
 * 1. **Tabindex on the items**: each item in `items` must have `tabindex="0"`
 *    (or be a naturally focusable element) so it can receive programmatic
 *    focus. The widget container itself should have `tabindex="-1"` or no
 *    tabindex at all, to avoid a double Tab stop.
 *
 * 2. **Boundary behaviour**: at the first/last item the arrow keys call
 *    `preventDefault` but do NOT wrap around. Wrapping is intentionally
 *    omitted — the APG recommends it only for menu/menubar; for grids and
 *    listboxes focus should stop at the boundary so the user can Tab out.
 *
 * 3. **Opt-in callbacks**: pass only the callbacks you need. A widget that
 *    uses native links does not need `onActivate`; a single-axis list does
 *    not need `onFirst`/`onLast`.
 *
 * 4. **`onNext` / `onPrevious` receive the target index** so callers can
 *    update ARIA live regions, selection state, or other side-effects in the
 *    same synchronous frame as the focus move.
 *
 * @param event   - The `KeyboardEvent` from the host element's `keydown` handler.
 * @param index   - Zero-based index of the currently focused item within `items`.
 * @param items   - Ordered array of the widget's focusable `HTMLElement` items.
 * @param options - Opt-in callbacks; see {@link LinearKeydownOptions}.
 *
 * @example
 * // Table row keyboard navigation (ArrowDown/Up + Home/End + Enter/Space)
 * onRowKeydown(event: KeyboardEvent, index: number, item: T): void {
 *   handleLinearKeydown(event, index, this.tableRows.map(r => r.nativeElement), {
 *     onNext:     (i) => this.tableRows[i].nativeElement.focus(),
 *     onPrevious: (i) => this.tableRows[i].nativeElement.focus(),
 *     onFirst:    () => this.tableRows[0].nativeElement.focus(),
 *     onLast:     () => this.tableRows[this.tableRows.length - 1].nativeElement.focus(),
 *     onActivate: () => this.launchItem(item),
 *   });
 * }
 */
export const handleLinearKeydown = (
  event: KeyboardEvent,
  index: number,
  items: HTMLElement[],
  options: LinearKeydownOptions
): void => {
  const { onNext, onPrevious, onFirst, onLast, onActivate } = options;

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault();
      if (index < items.length - 1) {
        onNext?.(index + 1);
      }
      break;
    case 'ArrowUp':
      event.preventDefault();
      if (index > 0) {
        onPrevious?.(index - 1);
      }
      break;
    case 'Home':
      event.preventDefault();
      onFirst?.();
      break;
    case 'End':
      event.preventDefault();
      onLast?.();
      break;
    case 'Enter':
    case ' ':
      if (onActivate) {
        event.preventDefault();
        onActivate();
      }
      break;
  }
};
