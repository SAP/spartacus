import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseMessageComponent } from '../../../organization-message/base-message.component';
import { MessageComponentData } from '../../../organization-message/message.model';
import { MessageService } from '../../../organization-message/services/message.service';
import { MessagePromptData } from './prompt.model';

@Component({
  selector: 'cx-prompt',
  templateUrl: './prompt.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromptMessageComponent extends BaseMessageComponent {
  constructor(
    protected data: MessageComponentData,
    protected messageService: MessageService
  ) {
    super(data as MessageComponentData);
  }

  confirm() {
    (this.data as MessagePromptData<any>).confirm?.next(true);
  }
}
