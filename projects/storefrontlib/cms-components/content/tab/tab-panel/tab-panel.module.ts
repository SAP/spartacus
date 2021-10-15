import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { OutletModule } from '../../../../cms-structure/outlet/outlet.module';
import { PageComponentModule } from '../../../../cms-structure/page/component/page-component.module';
import { LayoutModule } from '../../../../layout/layout.module';
import { TabPanelComponent } from './tab-panel.component';

@NgModule({
  imports: [
    CommonModule,
    PageComponentModule,
    OutletModule,
    I18nModule,
    LayoutModule,
  ],
  declarations: [TabPanelComponent],
  exports: [TabPanelComponent],
})
export class TabPanelModule {}
