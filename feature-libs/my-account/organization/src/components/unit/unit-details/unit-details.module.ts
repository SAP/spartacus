import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, UrlModule } from '@spartacus/core';
import { UnitDetailsComponent } from './unit-details.component';
import {
  ConfirmModalModule,
  SplitViewModule,
  IconModule,
} from '@spartacus/storefront';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    UrlModule,
    I18nModule,
    ConfirmModalModule,

    SplitViewModule,
    RouterModule,
    IconModule,
  ],
  declarations: [UnitDetailsComponent],
  exports: [UnitDetailsComponent],
})
export class UnitDetailsModule {}
