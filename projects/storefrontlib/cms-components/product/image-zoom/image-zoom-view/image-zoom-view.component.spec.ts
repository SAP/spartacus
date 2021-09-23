import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Product } from '@spartacus/core';
import {
  BREAKPOINT,
  BreakpointService,
  CurrentProductService,
} from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { ImageZoomViewComponent } from './image-zoom-view.component';

class MockCurrentProductService {
  getProduct(): Observable<Product> {
    return of();
  }
}

class MockBreakpointService {
  get breakpoint$() {
    return of({});
  }
  isUp(_breakpoint: BREAKPOINT) {
    return of({});
  }
  isDown(_breakpoint: BREAKPOINT) {
    return of({});
  }
}

@Component({
  selector: 'cx-media',
  template: '',
})
class MockMediaComponent {
  @Input() container: any;
}

@Component({
  selector: 'cx-product-thumbnails',
  template: '',
})
class MockProductThumbnailsComponent {
  @Input() thumbs$: any;
}

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockIconComponent {
  @Input() type: any;
}

describe('ImageZoomViewComponent', () => {
  let component: ImageZoomViewComponent;
  let fixture: ComponentFixture<ImageZoomViewComponent>;
  let currentProductService: CurrentProductService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ImageZoomViewComponent,
        MockIconComponent,
        MockMediaComponent,
        MockProductThumbnailsComponent,
      ],
      providers: [
        { provide: CurrentProductService, useClass: MockCurrentProductService },
        { provide: BreakpointService, useClass: MockBreakpointService },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ImageZoomViewComponent);
    component = fixture.componentInstance;

    currentProductService = TestBed.inject(CurrentProductService);
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
})