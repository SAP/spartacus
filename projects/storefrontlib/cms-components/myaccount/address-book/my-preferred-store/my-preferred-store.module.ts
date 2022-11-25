import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { MyPreferredStoreComponent } from './my-preferred-store.component';

@NgModule({
  imports: [CommonModule],
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
