import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, UrlModule } from '@spartacus/core';
import { UnitChildrenComponent } from './unit-children.component';
import {
  ConfirmModalModule,
  IconModule,
  OutletRefModule,
  // OutletRefModule,
  SplitViewModule,
  // TableModule,
} from '@spartacus/storefront';
// import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    // CommonModule,
    // UrlModule,
    // I18nModule,
    // TableModule,
    // FormsModule,
    // SplitViewModule,
    // RouterModule,
    // OutletRefModule,
    // IconModule,

    CommonModule,
    UrlModule,
    I18nModule,
    ConfirmModalModule,

    SplitViewModule,
    RouterModule,
    IconModule,
    OutletRefModule,
  ],
  declarations: [UnitChildrenComponent],
  exports: [UnitChildrenComponent],
  entryComponents: [UnitChildrenComponent],
})
export class UnitChildrenModule {}
