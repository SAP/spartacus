export enum GlobalMessageType {
  MSG_TYPE_CONFIRMATION = '[GlobalMessage] Confirmation',
  MSG_TYPE_ERROR = '[GlobalMessage] Error',
  MSG_TYPE_INFO = '[GlobalMessage] Information'
}

export class GlobalMessage {
  text: string;
  type: GlobalMessageType;

  constructor(text: string, type: GlobalMessageType) {
    this.text = text;
    this.type = type;
  }
}
