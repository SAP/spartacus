import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { I18nModule } from '@spartacus/core';
import { CardComponent } from './card.component';
import { IconModule } from '../../../cms-components/misc/icon/icon.module';
import { AutoFocusDirectiveModule } from '../../directives/auto-focus/auto-focus.directive.module';

@NgModule({
  imports: [CommonModule, I18nModule, IconModule, AutoFocusDirectiveModule],
  declarations: [CardComponent],
  exports: [CardComponent],
})
export class CardModule {}
