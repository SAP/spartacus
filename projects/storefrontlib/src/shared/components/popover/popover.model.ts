export type PopoverPosition =
  | 'auto'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'left-top'
  | 'left-bottom'
  | 'right-top'
  | 'right-bottom';

export type PopoverPositionArray =
  | PopoverPosition
  | Array<PopoverPosition>
  | string;

export enum PopoverEvent {
  INSIDE_CLICK = 'insideClick',
  OUTSIDE_CLICK = 'outsideClick',
  ESCAPE_KEYDOWN = 'escapeKeydown',
  CLOSE_BUTTON_CLICK = 'closeButtonClick',
  CLOSE_BUTTON_KEYDOWN = 'closeButtonKeydown',
  ROUTE_CHANGE = 'routeChange',
}

export interface PopoverOptions {
  /**
   * The preferred placement of the popover. Default popover position is 'auto'.
   *
   *  Allowed popover positions: 'auto', 'top', 'bottom', 'left', 'right',
   * 'top-left', 'top-right', 'bottom-left', 'bottom-right',
   * 'left-top', 'left-bottom', 'right-top', 'right-bottom'.
   */
  placement?: PopoverPosition;

  /**
   * Flag used to prevent firing popover open function.
   */
  disable?: boolean;

  /**
   * Custom class name for popover component wrapper.
   */
  class?: string;

  /**
   * Flag used to hide close button in popover component.
   */
  displayCloseButton?: boolean;

  /**
   * Append popover component into 'body' selector.
   */
  appendToBody?: boolean;

  /**
   * Flag indicates if popover should be re-positioned on scroll event.
   */
  positionOnScroll?: boolean;
}
