import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, ConfigModule, I18nModule } from '@spartacus/core';
import { SkipLinkComponent } from './skip-link.component';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        SkipLinkComponent: { selector: 'cx-skip-link' },
      },
    }),
    I18nModule,
  ],
  declarations: [SkipLinkComponent],
  entryComponents: [SkipLinkComponent],
})
export class SkipLinkModule {}
