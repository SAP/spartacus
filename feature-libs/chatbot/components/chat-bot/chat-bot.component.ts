import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ChatBotConfig,
  ChatBotEvent,
  ChatBotService,
} from '@spartacus/chatbot/core';
import { ProductService, ProductScope } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { of, Subscription } from 'rxjs';

@Component({
  selector: 'cx-chat-bot',
  templateUrl: './chat-bot.component.html',
})
export class ChatBotComponent implements OnInit, OnDestroy {
  constructor(
    protected chatBotConfig: ChatBotConfig,
    protected service: ChatBotService,
    protected productService: ProductService
  ) {}

  config = this.chatBotConfig.chatBot;
  conversation$ = this.service.conversation$;
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
  recommendations$: any;

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
    this.events$.subscribe((event: ChatBotEvent) => {
      if (event === ChatBotEvent.DISPLAY_RECOMMENDATIONS) {
        this.displayRecommendations();
      }
    });
  }

  ngOnInit() {
    // TODO: Update recomendations based on choices
    this.recommendations$ = of([
      this.productService.get('300938', ProductScope.LIST),
      this.productService.get('358639', ProductScope.LIST),
      this.productService.get('300938', ProductScope.LIST),
      this.productService.get('358639', ProductScope.LIST),
      this.productService.get('300938', ProductScope.LIST),
      this.productService.get('358639', ProductScope.LIST),
      this.productService.get('300938', ProductScope.LIST),
      this.productService.get('358639', ProductScope.LIST),
      this.productService.get('300938', ProductScope.LIST),
      this.productService.get('358639', ProductScope.LIST),
      this.productService.get('300938', ProductScope.LIST),
      this.productService.get('358639', ProductScope.LIST),
    ]);

    this.handleEvents();
  }

  ngOnDestroy(): void {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
  }
}
