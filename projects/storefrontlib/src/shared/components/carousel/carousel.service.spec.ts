import { TestBed } from '@angular/core/testing';
import { WindowRef } from '@spartacus/core';
import { CarouselService } from './carousel.service';

const EXPECTED_VALUE_2 = 2;
const EXPECTED_VALUE_3 = 3;
const EXPECTED_VALUE_4 = 4;
const EXPECTED_VALUE_500 = 500;
const EXPECTED_VALUE_999 = 999;
const EXPECTED_VALUE_1000 = 1000;

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
    spyOnProperty(element, 'clientWidth').and.returnValue(EXPECTED_VALUE_1000);

    service.getItemsPerSlide(element, '250px').subscribe((value) => {
      expect(value).toEqual(EXPECTED_VALUE_4);
      done();
    });
  });

  it('should return 2 items per slide', (done) => {
    spyOnProperty(element, 'clientWidth').and.returnValue(EXPECTED_VALUE_500);

    service.getItemsPerSlide(element, '250px').subscribe((value) => {
      expect(value).toEqual(EXPECTED_VALUE_2);
      done();
    });
  });

  it('should round down the items per slide', (done) => {
    spyOnProperty(element, 'clientWidth').and.returnValue(EXPECTED_VALUE_999);

    service.getItemsPerSlide(element, '250px').subscribe((value) => {
      expect(value).toEqual(EXPECTED_VALUE_3);
      done();
    });
  });

  it('should return 1 item per slide in case of 100%', (done) => {
    spyOnProperty(element, 'clientWidth').and.returnValue(EXPECTED_VALUE_1000);

    service.getItemsPerSlide(element, '100%').subscribe((value) => {
      expect(value).toEqual(1);
      done();
    });
  });
});
