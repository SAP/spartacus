import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ProductImageZoomThumbnailsComponent } from './product-image-zoom-thumbnails.component';

const firstImage = {
  zoom: {
    url: 'zoom-1.jpg',
    galleryIndex: 1,
  },
  thumbnail: {
    url: 'thumb-1.jpg',
    galleryIndex: 1,
  },
};
const secondImage = {
  zoom: {
    url: 'zoom-2.jpg',
    galleryIndex: 2,
  },
  thumbnail: {
    url: 'thumb-2.jpg',
    galleryIndex: 2,
  },
};

@Component({
  selector: 'cx-carousel',
  template: `
    <ng-container *ngFor="let item of items">
      <ng-container
        *ngTemplateOutlet="template; context: { item: item }"
      ></ng-container>
    </ng-container>
  `,
})
class MockCarouselComponent {
  @Input() items;
  @Input() itemWidth;
  @Input() template;
  @Input() hideIndicators;
}

describe('ProductImageZoomThumbnailsComponent', () => {
  let productImageZoomThumbnailsComponent: ProductImageZoomThumbnailsComponent;
  let fixture: ComponentFixture<ProductImageZoomThumbnailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          ProductImageZoomThumbnailsComponent,
          MockCarouselComponent,
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductImageZoomThumbnailsComponent);
    productImageZoomThumbnailsComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(productImageZoomThumbnailsComponent).toBeTruthy();
  });

  describe('openImage', () => {
    it('should emit event with image and index', () => {
      spyOn(productImageZoomThumbnailsComponent.productImage, 'emit');

      productImageZoomThumbnailsComponent.openImage(firstImage);

      expect(
        productImageZoomThumbnailsComponent.productImage.emit
      ).toHaveBeenCalledWith({ image: firstImage, index: 1 });
    });
  });

  describe('isActive', () => {
    beforeEach(() => {
      productImageZoomThumbnailsComponent.openImage(firstImage);
    });

    it('should return true when active', () => {
      let result: boolean;
      productImageZoomThumbnailsComponent
        .isActive(firstImage)
        .subscribe((val) => (result = val))
        .unsubscribe();
      expect(result).toBeTruthy();
    });
    it('should return false when NOT active', () => {
      let result: boolean;
      productImageZoomThumbnailsComponent
        .isActive(secondImage)
        .subscribe((val) => (result = val))
        .unsubscribe();
      expect(result).toBeFalsy();
    });
  });
});
