import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParagraphComponent } from './paragraph.component';
import { ConfigModule } from '@spartacus/core';
import { CmsConfig } from '@spartacus/core';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CMSParagraphComponent: { selector: 'cx-paragraph' }
      }
    })
  ],
  declarations: [ParagraphComponent],
  exports: [ParagraphComponent],
  entryComponents: [ParagraphComponent]
})
export class CmsParagraphModule {}
