import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseMessageComponent } from '../../../organization-message/base-message.component';
import { MessageComponentData } from '../../../organization-message/message.model';
import { PromptMessageService } from './prompt.message.service';

@Component({
  selector: 'cx-prompt',
  templateUrl: './prompt.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromptMessageComponent extends BaseMessageComponent {
  constructor(
    protected data: MessageComponentData,
    protected promptMessageService: PromptMessageService
  ) {
    super(data);
  }

  handleConfirm() {
    this.promptMessageService.confirm.emit(this.data);
  }
}
