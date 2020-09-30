import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { UnitListComponent } from './unit-list.component';
import { IconModule, SplitViewModule } from '@spartacus/storefront';
import { UnitTreeModule } from '../unit-tree/unit-tree.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,
    I18nModule,
    UnitTreeModule,
    SplitViewModule,
    IconModule,
  ],
  declarations: [UnitListComponent],
  exports: [UnitListComponent],
  entryComponents: [UnitListComponent],
})
export class UnitListModule {}
