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
  OPEN = 'open',
  OPEN_BY_KEYBOARD = 'openByKeyboard',
}

export interface PopoverOptions {
  /**
   * The preferred placement of the popover. Default popover position is 'top'.
   *
   *  Allowed popover positions: 'auto', 'top', 'bottom', 'left', 'right',
   * 'top-left', 'top-right', 'bottom-left', 'bottom-right',
   * 'left-top', 'left-bottom', 'right-top', 'right-bottom'.
   */
  placement?: PopoverPosition;

  /**
   * Flag used to define if popover should look for the best placement
   * in case if there is not enough space in viewport for preferred position.
   *
   * By default this property is set to `true`.
   *
   * Value of this flag is omitted if preferred position is set to `auto`.
   */
  autoPositioning?: boolean;

  /**
   * Flag used to prevent firing popover open function.
   */
  disable?: boolean;

  /**
   * Custom class name passed to popover component.
   *
   * If this property is not set the default popover class is `cx-popover`.
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
