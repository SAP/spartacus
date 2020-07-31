import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { ManageUnitsListComponent } from './unit-list.component';
import {
  IconModule,
  InteractiveTableModule,
  SplitViewModule,
} from '@spartacus/storefront';
import { UnitTreeNavigationUIModule } from '../unit-tree-navigation-ui/unit-tree-navigation-ui.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,
    I18nModule,
    InteractiveTableModule,
    UnitTreeNavigationUIModule,
    SplitViewModule,
    RouterModule,
    IconModule,
  ],
  declarations: [ManageUnitsListComponent],
  exports: [ManageUnitsListComponent],
  entryComponents: [ManageUnitsListComponent],
})
export class UnitListModule {}
