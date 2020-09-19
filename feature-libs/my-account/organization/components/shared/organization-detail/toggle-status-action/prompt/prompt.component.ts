import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseMessageComponent } from '../../../organization-message/base-message.component';
import { MessageData } from '../../../organization-message/message.model';
import { MessageService } from '../../../organization-message/services/message.service';
import { MessageConfirmationData } from './prompt.model';

@Component({
  selector: 'cx-prompt',
  templateUrl: './prompt.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromptMessageComponent extends BaseMessageComponent {
  constructor(
    protected data: MessageData<MessageConfirmationData>,
    protected messageService: MessageService
  ) {
    super(data);
  }

  confirm() {
    this.data.events.next({ confirm: true });
  }
}
