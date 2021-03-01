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
