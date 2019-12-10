import { Event } from '../events/event.model';

export class ClickEvent extends Event {
  ClickData?: any;
}
export class MouseDownEvent extends Event {
  MouseDownData?: any;
}
export class MouseUpEvent extends Event {
  MouseUpData?: any;
}
export class MouseHoverEvent extends Event {
  MouseHoverData?: any;
}
