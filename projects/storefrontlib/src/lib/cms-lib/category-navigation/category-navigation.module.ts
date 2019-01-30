import { BootstrapModule } from '../../bootstrap.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigModule, CmsConfig, CmsService } from '@spartacus/core';
import { NavigationModule } from '../navigation/navigation.module';
import { CategoryNavigationComponent } from './category-navigation.component';
import { NavigationService } from '../navigation/navigation.service';
import { CmsComponentData } from '../../cms/components/cms-component-data';

@NgModule({
  imports: [
    CommonModule,
    NavigationModule,
    BootstrapModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CategoryNavigationComponent: {
          selector: 'cx-category-navigation',
          providers: [
            {
              provide: NavigationService,
              useClass: NavigationService,
              deps: [CmsService, CmsComponentData]
            }
          ]
        }
      }
    })
  ],
  declarations: [CategoryNavigationComponent],
  entryComponents: [CategoryNavigationComponent],
  exports: [CategoryNavigationComponent]
})
export class CategoryNavigationModule {}
