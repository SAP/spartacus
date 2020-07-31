import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, UrlModule } from '@spartacus/core';
import { UnitTreeNavigationUIComponent } from './unit-tree-navigation-ui.component';
import { IconModule } from '@spartacus/storefront';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, UrlModule, I18nModule, IconModule, RouterModule],
  declarations: [UnitTreeNavigationUIComponent],
  exports: [UnitTreeNavigationUIComponent],
})
export class UnitTreeNavigationUIModule {}
