import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigModule } from '@spartacus/core';
import { CmsConfig } from '@spartacus/core';

import { ParagraphComponent } from './paragraph.component';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CMSParagraphComponent: {
          component: ParagraphComponent,
        },
        CMSTabParagraphComponent: {
          component: ParagraphComponent,
        },
      },
    }),
  ],
  declarations: [ParagraphComponent],
  exports: [ParagraphComponent],
  entryComponents: [ParagraphComponent],
})
export class CmsParagraphModule {}
