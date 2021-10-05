import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ImageZoomThumbnailsComponent } from './image-zoom-thumbnails.component';


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
  @Input() items: any;
  @Input() itemWidth: string;
  @Input() template: any;
  @Input() hideIndicators: boolean;
}

describe('ImageZoomThumbnailsComponent', () => {
  let imageZoomThumbnailsComponent: ImageZoomThumbnailsComponent;
  let fixture: ComponentFixture<ImageZoomThumbnailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ImageZoomThumbnailsComponent, MockCarouselComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageZoomThumbnailsComponent);
    imageZoomThumbnailsComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(imageZoomThumbnailsComponent).toBeTruthy();
  });
});
