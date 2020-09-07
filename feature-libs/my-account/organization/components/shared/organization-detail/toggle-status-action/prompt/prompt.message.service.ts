import { EventEmitter, Injectable, Output } from '@angular/core';
import { MessageComponentData } from '../../../organization-message/message.model';
import { MessageService } from '../../../organization-message/services/message.service';

@Injectable({
  providedIn: 'root',
})
export class PromptMessageService extends MessageService {
  @Output() confirm: EventEmitter<MessageComponentData> = new EventEmitter();
}
