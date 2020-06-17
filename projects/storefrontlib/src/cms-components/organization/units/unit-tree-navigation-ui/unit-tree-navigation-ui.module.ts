import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, UrlModule } from '@spartacus/core';
import { GenericLinkModule } from '../../../../shared/components/generic-link';
import { IconModule } from '../../../misc/icon/index';
import { UnitTreeNavigationUIComponent } from './unit-tree-navigation-ui.component';

@NgModule({
  imports: [CommonModule, UrlModule, I18nModule, IconModule, GenericLinkModule],
  declarations: [UnitTreeNavigationUIComponent],
  exports: [UnitTreeNavigationUIComponent],
  providers: [],
  entryComponents: [UnitTreeNavigationUIComponent],
})
export class UnitTreeNavigationUIModule {}
