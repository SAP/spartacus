import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { IconModule } from '../../../../../cms-components/misc/icon/icon.module';
import { KeyboardFocusModule } from '../../../../../layout/a11y/keyboard-focus/keyboard-focus.module';
import { ActiveFacetsComponent } from './active-facets.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    I18nModule,
    IconModule,
    KeyboardFocusModule,
  ],
  declarations: [ActiveFacetsComponent],
  exports: [ActiveFacetsComponent],
})
export class ActiveFacetsModule {}
