import { NgModule } from '@angular/core';
import { CmsConfig, ConfigModule } from '@spartacus/core';
import { IconLibComponent } from './icon-lib.component';

@NgModule({
  declarations: [IconLibComponent],
  imports: [
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        IconLibComponent: { selector: 'cx-icon-lib' },
      },
    }),
  ],
  entryComponents: [IconLibComponent],
})
export class IconLibModule {}
