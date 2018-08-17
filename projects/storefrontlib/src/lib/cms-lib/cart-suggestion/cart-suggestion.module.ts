import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartSuggestionComponent } from './cart-suggestion.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CartSuggestionComponent],
  entryComponents: [CartSuggestionComponent],
  exports: [CartSuggestionComponent]
})
export class CartSuggestionModule {}
