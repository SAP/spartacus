import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, ConfigModule } from '@spartacus/core';
import { TabParagraphContainerComponent } from './tab-paragraph-container.component';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CMSTabParagraphComponent: { selector: 'cx-tab-paragraph-container' },
      },
    }),
  ],
  declarations: [TabParagraphContainerComponent],
  entryComponents: [TabParagraphContainerComponent],
  exports: [TabParagraphContainerComponent],
})
export class TabParagraphContainerModule {}
