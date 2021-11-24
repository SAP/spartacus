/**
 * The way that selections are displayed in 3D content.
 */
export enum SelectionDisplayMode {
  /**
   * An outline is rendered around the outside of the selected items.
   * This outline is rendered over the top of 3D content and cannot be occluded.
   */
  Highlight = 'Highlight',
  /**
   * A colour is applied to the surface of the selected items.
   */
  Outline = 'Outline',
}
