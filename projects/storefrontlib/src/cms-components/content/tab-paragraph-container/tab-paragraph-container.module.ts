import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, ConfigModule, I18nModule } from '@spartacus/core';
import { OutletModule } from '../../../cms-structure/outlet/outlet.module';
import { PageComponentModule } from '../../../cms-structure/page/component/page-component.module';
import { TabParagraphContainerComponent } from './tab-paragraph-container.component';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CMSTabParagraphContainer: {
          component: TabParagraphContainerComponent,
        },
      },
    }),
    PageComponentModule,
    OutletModule,
    I18nModule,
  ],
  declarations: [TabParagraphContainerComponent],
  entryComponents: [TabParagraphContainerComponent],
  exports: [TabParagraphContainerComponent],
})
export class TabParagraphContainerModule {}
