import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';

@NgModule({
  providers: [
    provideDefaultConfig({
      featureModules: {
        cartSavedCart: {
          cmsComponents: ['SavedCartComponent'],
        },
      },
    }),
  ],
})
export class SavedCartRootModule {}
