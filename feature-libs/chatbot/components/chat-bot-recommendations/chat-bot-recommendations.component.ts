import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICON_TYPE } from '@spartacus/storefront';
@Component({
  selector: 'cx-chat-bot-recommendations',
  templateUrl: './chat-bot-recommendations.component.html',
})
export class ChatBotRecommendationsComponent implements OnInit {
  /**
   * Products array.
   */
  @Input() products$: any;

  @Output() close: EventEmitter<any> = new EventEmitter();

  closeWindow() {
    this.close.emit(null);
  }

  closeIcon = ICON_TYPE.CLOSE;

  ngOnInit() {
    console.log('inited');
  }
}
