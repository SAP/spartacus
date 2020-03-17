import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { IconModule } from '../../../../../cms-components/misc/icon/index';
import { KeyboardFocusModule } from '../../../../../layout/a11y/keyboard-focus/keyboard-focus.module';
import { FacetComponent } from './facet.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,
    I18nModule,
    IconModule,
    KeyboardFocusModule,
  ],
  declarations: [FacetComponent],
  exports: [FacetComponent],
})
export class FacetModule {}
