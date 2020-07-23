import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ImageGroup } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ThumbGroup } from './thumbnails.model';

@Component({
  selector: 'cx-product-thumbnails',
  templateUrl: './product-thumbnails.component.html',
  styleUrls: ['./product-thumbnails.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductThumbnailsComponent {
  private mainMediaContainer = new BehaviorSubject<ImageGroup>(null);

  @Output() productImage = new EventEmitter<{ image: any; index: number }>();

  @Input() thumbs$: Observable<ThumbGroup[]>;

  selectedIndex: number;

  constructor() {}

  openImage(image: ImageGroup): void {
    this.mainMediaContainer.next(image);
    this.productImage.emit({ image, index: image.zoom?.galleryIndex });
  }

  isActive(thumbnail: ImageGroup): Observable<boolean> {
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
