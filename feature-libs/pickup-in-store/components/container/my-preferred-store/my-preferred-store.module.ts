import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, ConfigModule, I18nModule } from '@spartacus/core';
import { CardModule } from '@spartacus/storefront';
import { StoreModule } from '../../presentational/store';
import { MyPreferredStoreComponent } from './my-preferred-store.component';
@NgModule({
  imports: [
    CardModule,
    StoreModule,
    CommonModule,
    I18nModule,
    ConfigModule.withConfig({
      cmsComponents: {
        MyPreferredStore: {
          component: MyPreferredStoreComponent,
        },
      },
    } as CmsConfig),
  ],
  exports: [MyPreferredStoreComponent],
  declarations: [MyPreferredStoreComponent],
})
export class MyPreferredStoreModule {}
