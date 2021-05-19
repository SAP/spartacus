import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { LayoutModule } from 'projects/storefrontlib/src/layout';
import { OutletModule } from '../../../cms-structure/outlet/outlet.module';
import { PageComponentModule } from '../../../cms-structure/page/component/page-component.module';
import { TabComponent } from './tab.component';

@NgModule({
  imports: [
    CommonModule,
    PageComponentModule,
    OutletModule,
    I18nModule,
    LayoutModule,
  ],
  declarations: [TabComponent],
  entryComponents: [TabComponent],
  exports: [TabComponent],
})
export class TabModule {}
