import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { BaseMessageComponent } from './base-message.component';
import { Message } from './message.model';
import { NotificationRenderService } from './services/message-render.service';
import { MessageService } from './services/message.service';

@Component({
  selector: 'cx-organization-message',
  templateUrl: './organization-message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationMessageComponent implements OnInit, OnDestroy {
  @ViewChild('vc', { read: ViewContainerRef }) vcr: ViewContainerRef;

  protected subscription = new Subscription();

  constructor(
    protected messageService: MessageService,
    protected notificationRenderService: NotificationRenderService
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.messageService.get().subscribe((msg) => {
        if (msg) {
          this.render(msg);
        } else {
          this.vcr?.clear();
        }
      })
    );
  }

  protected render(msg: Message) {
    const ref: ComponentRef<BaseMessageComponent> = this.vcr.createComponent(
      this.notificationRenderService.getComponent(msg),
      undefined,
      this.notificationRenderService.getInjector(msg.data, this.vcr.injector)
    );
    ref.injector.get(ChangeDetectorRef).markForCheck();
    ref.instance.closeEvent.subscribe(() => ref.destroy());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
