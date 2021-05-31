import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { ProductThumbnailsComponent } from './product-thumbnails.component';

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

describe('ProductThumbnailsComponent', () => {
  let productThumbnailsComponent: ProductThumbnailsComponent;
  let fixture: ComponentFixture<ProductThumbnailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductThumbnailsComponent, MockCarouselComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductThumbnailsComponent);
    productThumbnailsComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(productThumbnailsComponent).toBeTruthy();
  });

  describe('openImage', () => {
    it('should emit event with image and index', () => {
      spyOn(productThumbnailsComponent.productImage, 'emit');

      productThumbnailsComponent.openImage(firstImage);

      expect(
        productThumbnailsComponent.productImage.emit
      ).toHaveBeenCalledWith({ image: firstImage, index: 1 });
    });
  });

  describe('isActive', () => {
    beforeEach(() => {
      productThumbnailsComponent.openImage(firstImage);
    });

    it('should return true when active', () => {
      let result: boolean;
      productThumbnailsComponent
        .isActive(firstImage)
        .subscribe((val) => (result = val))
        .unsubscribe();
      expect(result).toBeTruthy();
    });
    it('should return false when NOT active', () => {
      let result: boolean;
      productThumbnailsComponent
        .isActive(secondImage)
        .subscribe((val) => (result = val))
        .unsubscribe();
      expect(result).toBeFalsy();
    });
  });

  describe('UI test)', () => {
    it('should not render cx-carousel for one GALLERY image', () => {
      productThumbnailsComponent.thumbs$ = of([]);
      fixture.detectChanges();

      const carousel = fixture.debugElement.query(By.css('cx-carousel'));
      expect(carousel).toBeNull();
    });

    it('should have 2 rendered templates for two GALLERY images', () => {
      productThumbnailsComponent.thumbs$ = of([firstImage, secondImage]);
      fixture.detectChanges();

      const el = fixture.debugElement.queryAll(By.css('cx-carousel cx-media'));
      expect(el.length).toEqual(2);
    });
  });
});
