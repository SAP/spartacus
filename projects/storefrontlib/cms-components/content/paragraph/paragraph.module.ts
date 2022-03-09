import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { SupplementHashAnchorsModule } from '../../../shared/pipes/suplement-hash-anchors/supplement-hash-anchors.module';
import { ParagraphComponent } from './paragraph.component';

@NgModule({
  imports: [CommonModule, SupplementHashAnchorsModule],
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
