import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParagraphComponent } from './paragraph.component';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
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
})
export class CmsParagraphModule {}
