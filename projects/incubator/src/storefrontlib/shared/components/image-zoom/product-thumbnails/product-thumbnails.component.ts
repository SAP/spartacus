import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'cx-product-thumbnails',
  templateUrl: './product-thumbnails.component.html',
  styleUrls: ['./product-thumbnails.component.scss'],
})
export class ProductThumbnailsComponent {
  private mainMediaContainer = new BehaviorSubject(null);

  @Output() productImage = new EventEmitter<{ image: any; index: number }>();

  @Input() thumbs$: Observable<any[]>;

  selectedIndex: number;

  openImage(image: any): void {
    this.mainMediaContainer.next(image);
    this.productImage.emit({ image, index: image.zoom?.galleryIndex });
  }

  isActive(thumbnail): Observable<boolean> {
    return this.mainMediaContainer.pipe(
      filter(Boolean),
      map((container: any) => {
        return (
          container.zoom?.url &&
          thumbnail.zoom?.url &&
          container.zoom.url === thumbnail.zoom.url
        );
      })
    );
  }
}
