import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';

@NgModule({
  providers: [
    provideDefaultConfig({
      featureModules: {
        cartSavedCart: {
          cmsComponents: [
            'AddToSavedCartsComponent',
            'AccountSavedCartHistoryComponent',
            'SavedCartDetailsOverviewComponent',
            'SavedCartDetailsItemsComponent',
            'SavedCartDetailsActionComponent',
          ],
        },
      },
    }),
  ],
})
export class SavedCartRootModule {}
