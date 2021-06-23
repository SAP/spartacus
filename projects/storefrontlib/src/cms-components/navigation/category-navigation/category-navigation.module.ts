import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { NavigationModule } from '../navigation/navigation.module';
import { CategoryNavigationComponent } from './category-navigation.component';
import { defaultCategoryNavigationConfig } from './config/navigation.config';

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
    provideDefaultConfig(defaultCategoryNavigationConfig),
  ],
  declarations: [CategoryNavigationComponent],
  entryComponents: [CategoryNavigationComponent],
  exports: [CategoryNavigationComponent],
})
export class CategoryNavigationModule {}
