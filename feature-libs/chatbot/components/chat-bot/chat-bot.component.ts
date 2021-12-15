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
import { ProductService, ProductSearchService } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { of, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-chat-bot',
  templateUrl: './chat-bot.component.html',
})
export class ChatBotComponent implements OnInit, OnDestroy {
  constructor(
    protected chatBotConfig: ChatBotConfig,
    protected service: ChatBotService,
    protected productService: ProductService,
    protected productSearchService: ProductSearchService
  ) {}

  @ViewChild('messages') private messagesContainer: ElementRef;

  config = this.chatBotConfig.chatBot;
  conversation$ = this.service.conversation$.pipe(
    tap((messages) => {
      console.log('messages', messages, this.areMessagesAwaiting(messages));
      if (this.areMessagesAwaiting(messages)) {
        setTimeout(() => {
          this.service.updateMessageStatuses();
        }, this.config.messagesDelay);
      }
    }),
    map((messages) => {
      return messages.filter(
        (message) => message.status !== MessageStatus.QUEUED
      );
    })
  );

  options$ = this.service.options$;
  events$ = this.service.events$;
  isBotWriting$ = this.service.conversation$.pipe(
    map((messages) => this.areMessagesAwaiting(messages))
  );

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
  recommendations$: any;

  areMessagesAwaiting(messages) {
    return messages.find(
      (message) => this.isQueued(message) || this.isWriting(message)
    );
  }

  isQueued(message: any) {
    return message.status === MessageStatus.QUEUED;
  }

  isWriting(message: any) {
    return message.status === MessageStatus.WRITING;
  }

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
  displayRecommendations(delay = 0) {
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
        this.productSearchService
          .getResults()
          .pipe(
            map((searchResults) =>
              searchResults.products ? searchResults.products : []
            )
          )
          .subscribe(
            (data) =>
              (this.recommendations$ = of(
                data.map((product) => this.productService.get(product.code))
              ))
          );

        this.displayRecommendations(this.config?.messagesDelay * 5);
      }
      if (
        event === ChatBotEvent.NEW_MESSAGE ||
        event === ChatBotEvent.UPDATE_MESSAGE_STATUS
      ) {
        this.scrollToBottom();
      }
    });
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.messagesContainer && this.messagesContainer.nativeElement) {
        this.messagesContainer.nativeElement.scrollTop =
          this.messagesContainer.nativeElement.scrollHeight;
      }
    });
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
