import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, CmsService, ConfigModule } from '@spartacus/core';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { NavigationComponentService } from '../navigation/navigation.component.service';
import { NavigationModule } from '../navigation/navigation.module';
import { CategoryNavigationComponent } from './category-navigation.component';

@NgModule({
  imports: [
    CommonModule,
    NavigationModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CategoryNavigationComponent: {
          component: CategoryNavigationComponent,
          providers: [
            {
              provide: NavigationComponentService,
              useClass: NavigationComponentService,
              deps: [CmsService, CmsComponentData],
            },
          ],
        },
      },
    }),
  ],
  declarations: [CategoryNavigationComponent],
  entryComponents: [CategoryNavigationComponent],
  exports: [CategoryNavigationComponent],
})
export class CategoryNavigationModule {}
