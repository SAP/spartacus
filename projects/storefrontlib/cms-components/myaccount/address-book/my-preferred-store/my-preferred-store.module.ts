import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { PickupInStoreModule } from '@spartacus/pickup-in-store';
import { MyPreferredStoreComponent } from './my-preferred-store.component';

@NgModule({
  imports: [CommonModule, PickupInStoreModule],
  declarations: [MyPreferredStoreComponent],
  exports: [MyPreferredStoreComponent],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        MyPreferredStore: {
          component: MyPreferredStoreComponent,
        },
      },
    }),
  ],
})
export class MyPreferredStoreModule {}
