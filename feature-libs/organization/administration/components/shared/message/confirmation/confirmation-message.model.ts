import { MessageEventData } from '../message.model';

export interface ConfirmationMessageData extends MessageEventData {
  confirm?: boolean;
}
