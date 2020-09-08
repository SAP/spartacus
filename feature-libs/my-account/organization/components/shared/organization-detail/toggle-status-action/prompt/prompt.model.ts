import { Subject } from 'rxjs';
import { MessageComponentData } from '../../../organization-message/message.model';

export class MessagePromptData<T> extends MessageComponentData {
  item: T;
  confirm: Subject<boolean>;
}
