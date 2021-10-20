import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ImageGroup, isNotNullable } from '@spartacus/core';
import { ThumbnailsGroup } from '@spartacus/product/image-zoom/root';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'cx-product-image-zoom-thumbnails',
  templateUrl: './product-image-zoom-thumbnails.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductImageZoomThumbnailsComponent {
  private mainMediaContainer = new BehaviorSubject<ImageGroup>({});

  @Output() productImage = new EventEmitter<{ image: any; index: number }>();

  @Input() thumbs$: Observable<ThumbnailsGroup[]>;

  selectedIndex: number;

  constructor() {}

  openImage(image: ImageGroup): void {
    this.mainMediaContainer.next(image);
    if (image.zoom?.galleryIndex) {
      this.productImage.emit({ image, index: image.zoom.galleryIndex });
    }
  }

  isActive(thumbnail: ImageGroup): Observable<boolean> {
    return this.mainMediaContainer.asObservable().pipe(
      filter(isNotNullable),
      map((container: ImageGroup) => {
        return (container.zoom?.url &&
          thumbnail.zoom?.url &&
          container.zoom.url === thumbnail.zoom.url) as boolean;
      })
    );
  }
}
