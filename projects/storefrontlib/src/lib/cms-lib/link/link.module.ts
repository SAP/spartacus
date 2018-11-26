import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LinkComponent } from './link.component';
import { ConfigModule } from '@spartacus/core';
import { CmsModuleConfig } from '../../cms/cms-module-config';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ConfigModule.withConfig(<CmsModuleConfig>{
      cmsComponents: {
        CMSLinkComponent: { selector: 'cx-link' }
      }
    })
  ],
  declarations: [LinkComponent],
  exports: [LinkComponent],
  entryComponents: [LinkComponent]
})
export class LinkModule {}
