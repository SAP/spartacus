import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICON_TYPE } from '@spartacus/storefront';
@Component({
  selector: 'cx-chat-bot-recommendations',
  templateUrl: './chat-bot-recommendations.component.html',
})
export class ChatBotRecommendationsComponent {
  /**
   * Products array.
   */
  @Input() products$: any;

  @Output() closeRecommendations: EventEmitter<any> = new EventEmitter();

  @Output() openProductPage: EventEmitter<any> = new EventEmitter();

  closeRecommendationsWindow() {
    this.closeRecommendations.emit(null);
  }

  displayProduct() {
    this.openProductPage.emit(null);
  }

  closeIcon = ICON_TYPE.CLOSE;
}
