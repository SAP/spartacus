import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { SmartEditRootModule } from '@spartacus/smartedit/root';

@NgModule({
  imports: [SmartEditRootModule],
  providers: [
    provideConfig({
      featureModules: {
        smartEdit: {
          module: () =>
            import('@spartacus/smartedit').then((m) => m.SmartEditModule),
        },
      },
    }),
  ],
})
export class SmartEditFeatureModule {}
