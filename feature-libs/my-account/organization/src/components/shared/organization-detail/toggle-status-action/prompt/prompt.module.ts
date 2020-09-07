import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { PromptMessageComponent } from './prompt.component';

@NgModule({
  imports: [CommonModule, I18nModule, IconModule],
  declarations: [PromptMessageComponent],
})
export class PromptMessageModule {}
