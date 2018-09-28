import { NgModule } from '@angular/core';
import { MediaModule } from './media/media.module';
import { FormComponentsModule } from './form-components/form-components.module';
import { CardModule } from './card/card.module';
import { PaginationAndSortingModule } from './pagination-and-sorting/pagination-and-sorting.module';
import { SpinnerModule } from './spinner/spinner.module';
import { GenericLinkModule } from './generic-link/generic-link.module';

/* Components */
import { PictureComponent } from './media/picture/picture.component';
import { StarRatingComponent } from './form-components/star-rating/star-rating.component';
import { ItemCounterComponent } from './form-components/item-counter/item-counter.component';
import { CardComponent } from './card/card.component';
import { PaginationComponent } from './pagination-and-sorting/pagination/pagination.component';
import { SortingComponent } from './pagination-and-sorting/sorting/sorting.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { GenericLinkComponent } from './generic-link/generic-link.component';

// we include all UI component modules here, but in real live
// projects would only include those that are relevant.
// for "accelerators", we could include only those that are relevant, so this
// component module could be configurable or we could have separate component modules,
// i.e. powertools-components.module.
@NgModule({
  imports: [
    MediaModule,
    FormComponentsModule,
    CardModule,
    PaginationAndSortingModule,
    SpinnerModule,
    GenericLinkModule
  ],
  exports: [
    PictureComponent,
    StarRatingComponent,
    ItemCounterComponent,
    CardComponent,
    PaginationComponent,
    SortingComponent,
    SpinnerComponent,
    GenericLinkComponent
  ]
})
export class ComponentsModule {}
