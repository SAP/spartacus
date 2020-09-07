import {
  ChangeDetectorRef,
  Component,
  ComponentRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { BaseMessageComponent } from './base-message.component';
import { Message } from './message.model';
import { NotificationRenderService } from './services/message-render.service';
import { MessageService } from './services/message.service';

@Component({
  selector: 'cx-organization-message',
  templateUrl: './organization-message.component.html',
})
export class OrganizationMessageComponent implements OnInit {
  @ViewChild('vc', { read: ViewContainerRef }) vcr: ViewContainerRef;

  constructor(
    protected messageService: MessageService,
    protected notificationRenderService: NotificationRenderService
  ) {}

  ngOnInit() {
    this.messageService.message$.subscribe((msg) => {
      if (msg) {
        this.render(msg);
      } else {
        this.vcr.clear();
      }
    });
  }

  render(msg: Message) {
    const ref: ComponentRef<BaseMessageComponent> = this.vcr.createComponent(
      this.notificationRenderService.getComponent(msg),
      undefined,
      this.notificationRenderService.getInjector(msg.data)
    );
    ref.injector.get(ChangeDetectorRef).markForCheck();
    ref.instance.closeEvent.subscribe(() => ref.destroy());
  }
}
