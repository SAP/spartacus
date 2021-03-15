import { NgModule } from '@angular/core';
import { SavedCartEventBuilder } from './events/saved-cart-event.builder';

@NgModule({})
export class SavedCartEventsModule {
  constructor(_savedCartEventBuilder: SavedCartEventBuilder) {}
}
