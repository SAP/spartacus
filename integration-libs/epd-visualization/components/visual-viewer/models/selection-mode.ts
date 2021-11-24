/**
 * Defines the selection behaviour.
 */
export enum SelectionMode {
  /**
   * Clicking/tapping in the viewport can select at most one item.
   * Selecting a new item in this way will deselect any pre
   */
  Exclusive = 'exclusive',
  /**
   * Clicking/tapping in the viewport will not affect selection.
   */
  None = 'none',
  /**
   * A multiple selection mode in which clicking/tapping an item toggles its selection state.
   */
  Sticky = 'sticky',
}
