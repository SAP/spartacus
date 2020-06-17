import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, UrlModule } from '@spartacus/core';
import { IconModule } from '../../../misc/icon/icon.module';
import { GenericLinkModule } from '../../../../shared/components/generic-link/generic-link.module';
import { UnitTreeNavigationUIComponent } from './unit-tree-navigation-ui.component';

@NgModule({
  imports: [CommonModule, UrlModule, I18nModule, IconModule, GenericLinkModule],
  declarations: [UnitTreeNavigationUIComponent],
  exports: [UnitTreeNavigationUIComponent],
  providers: [],
  entryComponents: [UnitTreeNavigationUIComponent],
})
export class UnitTreeNavigationUIModule {}
