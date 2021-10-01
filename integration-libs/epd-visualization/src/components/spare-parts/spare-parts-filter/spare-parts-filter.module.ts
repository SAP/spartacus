import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { SparePartsFilterComponent } from './spare-parts-filter.component';

@NgModule({
  imports: [CommonModule, FormsModule, IconModule, UrlModule, I18nModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        SparePartsFilterComponent: {
          component: SparePartsFilterComponent,
        },
      },
    }),
  ],
  declarations: [SparePartsFilterComponent],
  entryComponents: [SparePartsFilterComponent],
  exports: [SparePartsFilterComponent],
})
export class SparePartsFilterModule {}
