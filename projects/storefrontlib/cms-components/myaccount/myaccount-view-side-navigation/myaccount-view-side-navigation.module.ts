import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyaccountViewSideNavigationComponent } from './myaccount-view-side-navigation.component';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { NavigationModule } from '../../navigation/navigation/navigation.module';

@NgModule({
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        MyAccountSideNavigationComponent: {
          component: MyaccountViewSideNavigationComponent,
        },
      },
    }),
  ],
  declarations: [MyaccountViewSideNavigationComponent],
  exports: [MyaccountViewSideNavigationComponent],
  imports: [
    CommonModule,
    NavigationModule,
    I18nModule,
  ]
})
export class MyaccountViewSideNavigationModule { }
