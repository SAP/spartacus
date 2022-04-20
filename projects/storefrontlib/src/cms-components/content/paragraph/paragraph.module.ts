import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { ParagraphComponent } from './paragraph.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
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
  entryComponents: [ParagraphComponent],
})
export class CmsParagraphModule {}
