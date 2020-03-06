import { BaseEvent } from '@spartacus/core';

export class ClickEvent extends BaseEvent<ClickEvent> {
  ClickData: any;
}

export class MouseDownEvent extends BaseEvent<MouseDownEvent> {
  MouseDownData: any;
}

export class MouseUpEvent extends BaseEvent<MouseUpEvent> {
  MouseUpData: any;
}

export class MouseHoverEvent extends BaseEvent<MouseHoverEvent> {
  MouseHoverData: any;
}
