import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { GenericLinkModule } from '../../../shared/components/generic-link/generic-link.module';
import { IconModule } from '../../misc/icon/icon.module';
import { NavigationUIComponent } from './navigation-ui.component';
import { NavigationComponent } from './navigation.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    IconModule,
    GenericLinkModule,
    I18nModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        NavigationComponent: {
          component: NavigationComponent,
        },
      },
    }),
  ],
  declarations: [NavigationComponent, NavigationUIComponent],
  exports: [NavigationComponent, NavigationUIComponent],
})
export class NavigationModule {}
