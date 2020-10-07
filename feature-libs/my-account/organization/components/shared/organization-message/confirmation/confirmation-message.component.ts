import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { BaseMessageComponent } from '../base-message.component';
import { MessageData } from '../message.model';
import { MessageService } from '../services/message.service';
import { ConfirmationMessageData } from './confirmation-message.model';

/**
 * Renders a confirmation message and cancel/confirm button in the message component.
 */
@Component({
  selector: 'cx-confirmation',
  templateUrl: './confirmation-message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationMessageComponent extends BaseMessageComponent {
  constructor(
    protected data: MessageData<ConfirmationMessageData>,
    @Inject(PLATFORM_ID) protected platformId: any,
    protected messageService: MessageService
  ) {
    super(data, platformId);
  }

  /**
   * Emits a confirmation event to the data events.
   *
   * The original author of the event message or other parties can observe
   * the event data.
   */
  confirm() {
    this.data.events.next({ confirm: true });
  }
}
