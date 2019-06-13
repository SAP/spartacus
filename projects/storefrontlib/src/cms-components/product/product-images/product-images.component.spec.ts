import {
  Component,
  DebugElement,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Product } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CarouselItem } from '../../../shared/components/carousel/index';
import { CurrentProductService } from '../current-product.service';
import { ProductImagesComponent } from './product-images.component';

const firstImage = {
  zoom: {
    url: '123',
  },
};
const secondImage = {
  zoom: {
    url: '456',
  },
};
const mockDataWithMultiplePictures: Product = {
  name: 'mockProduct1',
  images: {
    PRIMARY: firstImage,
    GALLERY: [firstImage, secondImage],
  },
};

const mockDataWithOnePicture: Product = {
  name: 'mockProduct2',
  images: {
    PRIMARY: firstImage,
    GALLERY: [firstImage],
  },
};

class MockCurrentProductService {
  getProduct(): Observable<Product> {
    return of();
  }
}

@Component({
  selector: 'cx-media',
  template: '',
})
class MockMediaComponent {
  @Input() container;
}

@Component({
  selector: 'cx-carousel',
  template: '',
})
class MockCarouselComponent {
  @Input() items;
  @Input() minItemPixelSize;
  @Input() hideIndicators;
  @Input() activeItem;
  @Output() open = new EventEmitter();
}

describe('ProductImagesComponent', () => {
  let component: ProductImagesComponent;
  let fixture: ComponentFixture<ProductImagesComponent>;
  let element: DebugElement;
  let currentProductService: CurrentProductService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductImagesComponent,
        MockMediaComponent,
        MockCarouselComponent,
      ],
      providers: [
        {
          provide: CurrentProductService,
          useClass: MockCurrentProductService,
        },
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    currentProductService = TestBed.get(CurrentProductService);
  });

  describe('ProductImagesComponent with multiple pictures', () => {
    beforeEach(() => {
      spyOn(currentProductService, 'getProduct').and.returnValue(
        of(mockDataWithMultiplePictures)
      );

      fixture = TestBed.createComponent(ProductImagesComponent);
      component = fixture.componentInstance;
      element = fixture.debugElement;
      fixture.detectChanges();
    });

    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    it('should have mainMediaContainer', () => {
      let result: any;
      component
        .getMain()
        .subscribe(value => (result = value))
        .unsubscribe();
      expect(result.zoom.url).toEqual('123');
    });

    it('should have <cx-media>', () => {
      component.getThumbs().subscribe();
      fixture.detectChanges();

      const picture = element.query(By.css('cx-media'));
      expect(picture.nativeElement).toBeDefined();
    });

    it('should have 2 thumbs', () => {
      let result: CarouselItem[];
      component
        .getThumbs()
        .subscribe(value => (result = value))
        .unsubscribe();
      expect(result.length).toEqual(2);
    });

    it('should have carousel element', () => {
      const carousel = element.query(By.css('cx-carousel'));
      expect(carousel.nativeElement).toBeDefined();
    });
  });

  describe('ProductImagesComponent with one pictures', () => {
    beforeEach(() => {
      spyOn(currentProductService, 'getProduct').and.returnValue(
        of(mockDataWithOnePicture)
      );
      fixture = TestBed.createComponent(ProductImagesComponent);
      component = fixture.componentInstance;
      element = fixture.debugElement;
      fixture.detectChanges();
    });

    it('should not have carousel element', () => {
      const carousel = element.query(By.css('cx-carousel'));
      expect(carousel).toBeNull();
    });
  });
});
