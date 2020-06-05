import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { UnitTreeNavigationUIComponent } from './unit-tree-navigation-ui.component';
import { GenericLinkModule } from '../../../../shared/components/generic-link';
import { IconModule } from '../../../misc/icon/index';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,
    I18nModule,
    IconModule,
    GenericLinkModule,
  ],
  declarations: [UnitTreeNavigationUIComponent],
  exports: [UnitTreeNavigationUIComponent],
  providers: [],
  entryComponents: [UnitTreeNavigationUIComponent],
})
export class UnitTreeNavigationUIModule {}
