import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ImageZoomThumbnailsComponent } from './image-zoom-thumbnails.component';

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

describe('ImageZoomThumbnailsComponent', () => {
  let imageZoomThumbnailsComponent: ImageZoomThumbnailsComponent;
  let fixture: ComponentFixture<ImageZoomThumbnailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ImageZoomThumbnailsComponent, MockCarouselComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageZoomThumbnailsComponent);
    imageZoomThumbnailsComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(imageZoomThumbnailsComponent).toBeTruthy();
  });

  describe('openImage', () => {
    it('should emit event with image and index', () => {
      spyOn(imageZoomThumbnailsComponent.productImage, 'emit');

      imageZoomThumbnailsComponent.openImage(firstImage);

      expect(
        imageZoomThumbnailsComponent.productImage.emit
      ).toHaveBeenCalledWith({ image: firstImage, index: 1 });
    });
  });

  describe('isActive', () => {
    beforeEach(() => {
      imageZoomThumbnailsComponent.openImage(firstImage);
    });

    it('should return true when active', () => {
      let result: boolean;
      imageZoomThumbnailsComponent
        .isActive(firstImage)
        .subscribe((val) => (result = val))
        .unsubscribe();
      expect(result).toBeTruthy();
    });
    it('should return false when NOT active', () => {
      let result: boolean;
      imageZoomThumbnailsComponent
        .isActive(secondImage)
        .subscribe((val) => (result = val))
        .unsubscribe();
      expect(result).toBeFalsy();
    });
  });
});
