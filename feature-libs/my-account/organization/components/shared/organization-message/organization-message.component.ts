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
    this.subscription.add(
      ref.instance.closeEvent.subscribe(() => this.terminate(ref))
    );
  }

  /**
   * Terminates the message component in 2 steps. It starts to toggle the terminate
   * state of the component and shortly after destroys the component completely. The
   * termination state allows the CSS layer to play an animation before destroying.
   */
  protected terminate(ref: ComponentRef<BaseMessageComponent>) {
    ref.instance.terminated = true;
    ref.injector.get(ChangeDetectorRef).markForCheck();
    setTimeout(() => {
      ref.destroy();
    }, 500);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
