import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { BaseMessageComponent } from './base-message.component';
import { MessageData, MessageEventData } from './message.model';
import { MessageRenderService } from './services/message-render.service';
import { MessageService } from './services/message.service';

@Component({
  selector: 'cx-org-message',
  templateUrl: './message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent implements AfterViewInit, OnDestroy {
  // We use a child view container ref, as creating components will become siblings.
  // We like the message components to appear inside the `cx-org-message` instead.
  @ViewChild('vcr', { read: ViewContainerRef }) vcr: ViewContainerRef;

  protected subscription = new Subscription();

  constructor(
    protected messageService: MessageService,
    protected renderService: MessageRenderService
  ) {}

  ngAfterViewInit() {
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

  protected render(msg: MessageData) {
    const ref: ComponentRef<BaseMessageComponent> = this.vcr.createComponent(
      this.renderService.getComponent(msg),
      0,
      this.renderService.getInjector(msg, this.vcr.injector)
    );
    ref.injector.get(ChangeDetectorRef).markForCheck();

    this.subscription.add(
      msg.events
        .pipe(filter((event: MessageEventData) => !!event.close))
        .subscribe(() => this.terminate(ref))
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
