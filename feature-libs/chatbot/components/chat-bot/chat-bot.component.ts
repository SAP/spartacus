import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  ChatBotConfig,
  ChatBotEvent,
  ChatBotService,
  MessageStatus,
} from '@spartacus/chatbot/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cx-chat-bot',
  templateUrl: './chat-bot.component.html',
})
export class ChatBotComponent implements OnInit, OnDestroy {
  constructor(
    protected chatBotConfig: ChatBotConfig,
    protected service: ChatBotService
  ) {}

  @ViewChild('messages') private messagesContainer: ElementRef;

  config = this.chatBotConfig.chatBot;
  conversation$ = this.service.messages$;
  isBotWriting$ = this.service.isBotWriting$;
  options$ = this.service.options$;
  events$ = this.service.events$;

  eventSubscription: Subscription;

  closeIcon = ICON_TYPE.CLOSE;
  /**
   * Detemines if chatbot is in open state.
   */
  isOpen = this.config.autoOpen;

  /**
   * Detemines if chatbot product recommendations component is in open state.
   */
  areRecommendationsOpen = false;

  /**
   * Observable with recommendations.
   */
  recommendations$ = this.service.recommendations$;

  isSent(message: any) {
    return message.status === MessageStatus.SENT;
  }
  /**
   * Toggle chatbot component to be open or displayed as bot icon.
   */
  toggle() {
    this.isOpen = !this.isOpen;
  }

  /**
   * Displays results component.
   */
  protected displayRecommendations(delay = 0) {
    setTimeout(() => {
      this.areRecommendationsOpen = true;
    }, delay);
  }

  /**
   * Hides results component.
   */
  hideRecommendations() {
    this.areRecommendationsOpen = false;
  }

  handleEvents() {
    this.eventSubscription = this.events$.subscribe((event: ChatBotEvent) => {
      if (event === ChatBotEvent.DISPLAY_RECOMMENDATIONS) {
        this.displayRecommendations(this.config?.messagesDelay * 2);
      }
      if (
        event === ChatBotEvent.NEW_MESSAGE ||
        event === ChatBotEvent.UPDATE_MESSAGE_STATUS
      ) {
        this.scrollToBottom();
      }
    });
  }

  protected scrollToBottom() {
    setTimeout(() => {
      if (this.messagesContainer && this.messagesContainer.nativeElement) {
        this.messagesContainer.nativeElement.scrollTop =
          this.messagesContainer.nativeElement.scrollHeight;
      }
    }, 10);
  }

  ngOnInit() {
    this.handleEvents();
  }

  ngOnDestroy(): void {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
  }
}
