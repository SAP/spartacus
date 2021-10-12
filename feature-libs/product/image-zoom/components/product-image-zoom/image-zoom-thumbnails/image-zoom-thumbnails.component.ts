import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ImageGroup } from '@spartacus/core';
import { ThumbnailsGroup } from '@spartacus/product/image-zoom/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'cx-image-zoom-thumbnails',
  templateUrl: './image-zoom-thumbnails.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageZoomThumbnailsComponent {
  private mainMediaContainer = new BehaviorSubject<ImageGroup | null>(null);

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

  isActive(thumbnail: ImageGroup): Observable<boolean | '' | undefined> {
    return this.mainMediaContainer.asObservable().pipe(
      filter(Boolean),
      map((container: ImageGroup) => {
        return (
          container.zoom?.url &&
          thumbnail.zoom?.url &&
          container.zoom.url === thumbnail.zoom.url
        );
      })
    );
  }
}
