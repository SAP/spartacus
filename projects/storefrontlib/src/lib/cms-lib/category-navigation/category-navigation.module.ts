import { BootstrapModule } from '../../bootstrap.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationModule } from '../navigation/navigation.module';

import { CategoryNavigationComponent } from './category-navigation.component';
import { ConfigModule } from '@spartacus/core';
import { CmsModuleConfig } from '@spartacus/storefront';

@NgModule({
  imports: [
    CommonModule,
    NavigationModule,
    BootstrapModule,
    ConfigModule.withConfig(<CmsModuleConfig>{
      cmsComponents: {
        CategoryNavigationComponent: { selector: 'cx-category-navigation' }
      }
    })
  ],
  declarations: [CategoryNavigationComponent],
  entryComponents: [CategoryNavigationComponent],
  exports: [CategoryNavigationComponent]
})
export class CategoryNavigationModule {}
