import { CxEvent } from '../events/event.model';

export class ClickEvent extends CxEvent {
  ClickData?: any;
}
export class MouseDownEvent extends CxEvent {
  MouseDownData?: any;
}
export class MouseUpEvent extends CxEvent {
  MouseUpData?: any;
}
export class MouseHoverEvent extends CxEvent {
  MouseHoverData?: any;
}
