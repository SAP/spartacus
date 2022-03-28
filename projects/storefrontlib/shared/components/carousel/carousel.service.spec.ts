import { TestBed } from '@angular/core/testing';
import { WindowRef } from '@spartacus/core';
import { CarouselService } from './carousel.service';

describe('Carousel Service', () => {
  let service: CarouselService;
  let element: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarouselService, WindowRef],
    });

    service = TestBed.inject(CarouselService);
    element = document.createElement('div');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return 4 items per slide', (done) => {
    spyOnProperty(element, 'clientWidth').and.returnValue(1000);

    service.getItemsPerSlide(element, '250px').subscribe((value) => {
      expect(value).toEqual(4);
      done();
    });
  });

  it('should return 2 items per slide', (done) => {
    spyOnProperty(element, 'clientWidth').and.returnValue(500);

    service.getItemsPerSlide(element, '250px').subscribe((value) => {
      expect(value).toEqual(2);
      done();
    });
  });

  it('should round down the items per slide', (done) => {
    spyOnProperty(element, 'clientWidth').and.returnValue(999);

    service.getItemsPerSlide(element, '250px').subscribe((value) => {
      expect(value).toEqual(3);
      done();
    });
  });

  it('should return 1 item per slide in case of 100%', (done) => {
    spyOnProperty(element, 'clientWidth').and.returnValue(1000);

    service.getItemsPerSlide(element, '100%').subscribe((value) => {
      expect(value).toEqual(1);
      done();
    });
  });
});
