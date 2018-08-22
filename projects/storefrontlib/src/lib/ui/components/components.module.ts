import { NgModule } from '@angular/core';
import { MediaModule } from './media/media.module';
import { FormComponentsModule } from './form-components/form-components.module';

/* Components */
import { PictureComponent } from './media/picture/picture.component';
import { StarRatingComponent } from './form-components/star-rating/star-rating.component';
import { ItemCounterComponent } from './form-components/item-counter/item-counter.component';

// we include all UI component modules here, but in real live
// projects would only include those that are relevant.
// for "accelerators", we could include only those that are relevant, so this
// component module could be configurable or we could have separate component modules,
// i.e. powertools-components.module.
@NgModule({
  imports: [MediaModule, FormComponentsModule],
  exports: [PictureComponent, StarRatingComponent, ItemCounterComponent]
})
export class ComponentsModule {}
