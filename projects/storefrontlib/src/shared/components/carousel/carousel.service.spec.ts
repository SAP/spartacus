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
    const RETURN_VALUE = 1000;
    const EXPECTED_VALUE = 4;
    spyOnProperty(element, 'clientWidth').and.returnValue(RETURN_VALUE);

    service.getItemsPerSlide(element, '250px').subscribe((value) => {
      expect(value).toEqual(EXPECTED_VALUE);
      done();
    });
  });

  it('should return 2 items per slide', (done) => {
    const RETRUN_VALUE = 500;
    const EXPECTED_VALUE = 2;
    spyOnProperty(element, 'clientWidth').and.returnValue(RETRUN_VALUE);

    service.getItemsPerSlide(element, '250px').subscribe((value) => {
      expect(value).toEqual(EXPECTED_VALUE);
      done();
    });
  });

  it('should round down the items per slide', (done) => {
    const RETURN_VALUE = 999;
    const EXPECTED_VALUE = 3;
    spyOnProperty(element, 'clientWidth').and.returnValue(RETURN_VALUE);

    service.getItemsPerSlide(element, '250px').subscribe((value) => {
      expect(value).toEqual(EXPECTED_VALUE);
      done();
    });
  });

  it('should return 1 item per slide in case of 100%', (done) => {
    const RETURN_VALUE = 1000;
    spyOnProperty(element, 'clientWidth').and.returnValue(RETURN_VALUE);

    service.getItemsPerSlide(element, '100%').subscribe((value) => {
      expect(value).toEqual(1);
      done();
    });
  });
});
