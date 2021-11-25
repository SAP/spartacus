import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { PageComponentModule } from '../../../cms-structure/page/component/page-component.module';
import { TabModule } from '../tab/tab.module';
import { TabParagraphContainerComponent } from './tab-paragraph-container.component';

@NgModule({
  imports: [CommonModule, PageComponentModule, TabModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CMSTabParagraphContainer: {
          component: TabParagraphContainerComponent,
        },
      },
    }),
  ],
  declarations: [TabParagraphContainerComponent],
  exports: [TabParagraphContainerComponent],
})
export class TabParagraphContainerModule {}
