import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, UrlModule } from '@spartacus/core';
import { UnitTreeNavigationUIComponent } from './unit-tree-navigation-ui.component';
import { GenericLinkModule, IconModule } from '@spartacus/storefront';

@NgModule({
  imports: [CommonModule, UrlModule, I18nModule, IconModule, GenericLinkModule],
  declarations: [UnitTreeNavigationUIComponent],
  exports: [UnitTreeNavigationUIComponent],
  providers: [],
  entryComponents: [UnitTreeNavigationUIComponent],
})
export class UnitTreeNavigationUIModule {}
