import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParagraphComponent } from './paragraph.component';
import { ConfigModule } from '@spartacus/core';
import { CmsModuleConfig } from '../../cms/cms-module-config';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsModuleConfig>{
      cmsComponents: {
        CMSParagraphComponent: { selector: 'cx-paragraph' },
        CMSTabParagraphComponent: { selector: 'cx-paragraph' }
      }
    })
  ],
  declarations: [ParagraphComponent],
  exports: [ParagraphComponent],
  entryComponents: [ParagraphComponent]
})
export class CmsParagraphModule {}
