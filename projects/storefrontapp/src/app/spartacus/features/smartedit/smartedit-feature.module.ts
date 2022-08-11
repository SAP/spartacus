import { NgModule } from '@angular/core';
import { CmsConfig, provideConfig } from '@spartacus/core';
import {
  SmartEditRootModule,
  SMART_EDIT_FEATURE,
} from '@spartacus/smartedit/root';

@NgModule({
  imports: [SmartEditRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [SMART_EDIT_FEATURE]: {
          module: () =>
            import('@spartacus/smartedit').then((m) => m.SmartEditModule),
        },
      },
    }),
  ],
})
export class SmartEditFeatureModule {}
