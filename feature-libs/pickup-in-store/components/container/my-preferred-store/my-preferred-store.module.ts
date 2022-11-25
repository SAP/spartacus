import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, ConfigModule } from '@spartacus/core';
import { MyPreferredStoreComponent } from './my-preferred-store.component';
@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig({
      cmsComponents: {
        MyPreferredStore: {
          component: MyPreferredStoreComponent,
        },
      },
    } as CmsConfig),
  ],
})
export class MyPreferredStoreModule {}
