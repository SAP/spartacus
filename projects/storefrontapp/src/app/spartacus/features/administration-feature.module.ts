import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import {
  organizationTranslationChunksConfig,
  organizationTranslations,
} from '@spartacus/organization/administration/assets';
import { AdministrationRootModule } from '@spartacus/organization/administration/root';

@NgModule({
  declarations: [],
  imports: [AdministrationRootModule],
  providers: [
    provideConfig({
      featureModules: {
        organizationAdministration: {
          module: () =>
            import('@spartacus/organization/administration').then(
              (m) => m.AdministrationModule
            ),
        },
      },
      i18n: {
        resources: organizationTranslations,
        chunks: organizationTranslationChunksConfig,
      },
    }),
  ],
})
export class AdministrationFeatureModule {}
