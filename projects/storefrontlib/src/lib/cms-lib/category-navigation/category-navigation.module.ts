import { BootstrapModule } from '../../bootstrap.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigModule, CmsConfig, CmsService } from '@spartacus/core';
import { NavigationModule } from '../navigation/navigation.module';
import { CategoryNavigationComponent } from './category-navigation.component';
import { NavigationComponentService } from '../navigation/navigation.component.service';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';

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
              provide: NavigationComponentService,
              useClass: NavigationComponentService,
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
