import { NgModule } from '@angular/core';
import { CardComponent } from './card/card.component';
import { CardModule } from './card/card.module';
import { FormComponentsModule } from './form-components/form-components.module';
import { ItemCounterComponent } from './form-components/item-counter/item-counter.component';
import { StarRatingComponent } from './form-components/star-rating/star-rating.component';
import { GenericLinkComponent } from './generic-link/generic-link.component';
import { GenericLinkModule } from './generic-link/generic-link.module';
import { MediaComponent } from './media/media.component';
import { MediaModule } from './media/media.module';
import { PaginationAndSortingModule } from './pagination-and-sorting/pagination-and-sorting.module';
import { PaginationComponent } from './pagination-and-sorting/pagination/pagination.component';
import { SortingComponent } from './pagination-and-sorting/sorting/sorting.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerModule } from './spinner/spinner.module';

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
    GenericLinkModule,
  ],
  exports: [
    MediaComponent,
    StarRatingComponent,
    ItemCounterComponent,
    CardComponent,
    PaginationComponent,
    SortingComponent,
    SpinnerComponent,
    GenericLinkComponent,
  ],
})
export class ComponentsModule {}
