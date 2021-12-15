import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ChatBotConfig,
  ChatBotEvent,
  ChatBotService,
  MessageStatus,
} from '@spartacus/chatbot/core';
import { ProductService, ProductSearchService } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

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

  config = this.chatBotConfig.chatBot;
  conversation$ = this.service.conversation$;
  options$ = this.service.options$;
  events$ = this.service.events$;
  isBotWriting$ = this.service.conversation$.pipe(
    map((messages) => messages.find((message) => this.isWriting(message)))
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

  isWriting(message: any) {
    return message.status === MessageStatus.WRITING;
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
  displayRecommendations() {
    this.areRecommendationsOpen = true;
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

        this.displayRecommendations();
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
