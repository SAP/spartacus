import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyInterestsComponent } from './components/my-interests.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BootstrapModule } from '../../bootstrap.module';
import { PaginationAndSortingModule } from '../../ui/components/pagination-and-sorting/pagination-and-sorting.module';
import { MediaModule } from '../../ui/components/media/media.module';

import {
  UrlTranslationModule,
  ConfigModule,
  CmsConfig,
  I18nModule,
} from '@spartacus/core';
@NgModule({
  declarations: [MyInterestsComponent],
  imports: [
    CommonModule,
    I18nModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        MyInterestsComponent: {
          selector: 'cx-my-interests',
        },
      },
    }),
    RouterModule,
    FormsModule,
    NgSelectModule,
    BootstrapModule,
    PaginationAndSortingModule,
    UrlTranslationModule,
    I18nModule,
    MediaModule,
  ],
  exports: [MyInterestsComponent],
  entryComponents: [MyInterestsComponent],
})
export class MyInterestsModule {}
