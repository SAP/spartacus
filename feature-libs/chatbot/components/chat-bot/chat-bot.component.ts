import { Component } from '@angular/core';
import { ChatBotConfig, ChatBotService } from '@spartacus/chatbot/core';
import { ProductService, ProductScope } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { of } from 'rxjs';

@Component({
  selector: 'cx-chat-bot',
  templateUrl: './chat-bot.component.html',
})
export class ChatBotComponent {
  constructor(
    protected chatBotConfig: ChatBotConfig,
    protected service: ChatBotService,
    protected productService: ProductService
  ) {}

  config = this.chatBotConfig.chatBot;
  conversation$ = this.service.conversation$;
  options$ = this.service.options$;


  closeIcon = ICON_TYPE.CLOSE;

  /**
   * Detemines if chatbot is in open state.
   */
  isOpen = this.config.autoOpen;

  /**
   * Detemines if chatbot product recommendations component is in open state.
   */
  areRecommendationsOpen = true;

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
  }
}
