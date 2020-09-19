import { MessageEventData } from '../../../organization-message/message.model';

export interface MessageConfirmationData extends MessageEventData {
  confirm?: boolean;
}
