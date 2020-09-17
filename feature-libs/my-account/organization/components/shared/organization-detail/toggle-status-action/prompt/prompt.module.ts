import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { IconModule, KeyboardFocusModule } from '@spartacus/storefront';
import { PromptMessageComponent } from './prompt.component';

@NgModule({
  imports: [CommonModule, I18nModule, IconModule, KeyboardFocusModule],
  declarations: [PromptMessageComponent],
})
export class PromptMessageModule {}
