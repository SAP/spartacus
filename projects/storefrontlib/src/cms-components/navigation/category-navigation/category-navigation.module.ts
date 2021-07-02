import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { NavigationModule } from '../navigation/navigation.module';
import { CategoryNavigationComponent } from './category-navigation.component';
import { defaultNavigationConfig } from '../navigation/config/default-category-navigation.config';

@NgModule({
  imports: [CommonModule, NavigationModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CategoryNavigationComponent: {
          component: CategoryNavigationComponent,
        },
      },
    }),
    provideDefaultConfig(defaultNavigationConfig),
  ],
  declarations: [CategoryNavigationComponent],
  exports: [CategoryNavigationComponent],
})
export class CategoryNavigationModule {}
