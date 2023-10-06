import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAccountViewNameComponent } from './myaccount-view-name.component';
import { CmsConfig, I18nModule, UrlModule, provideDefaultConfig } from '@spartacus/core';
import { RouterModule } from '@angular/router';

@NgModule({
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        MyAccountViewNameComponent: {
          component: MyAccountViewNameComponent,
        },
      },
    }),
  ],
  declarations: [MyAccountViewNameComponent],
  exports: [MyAccountViewNameComponent],
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,
    I18nModule,
  ]
})
export class MyaccountViewNameModule { }
