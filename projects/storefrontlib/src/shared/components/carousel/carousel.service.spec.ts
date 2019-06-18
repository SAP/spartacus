import { TestBed } from '@angular/core/testing';
import { WindowRef } from '@spartacus/core';
import { CarouselService } from './carousel.service';

const itemWidth = 300;

describe('Carousel Service', () => {
  let service: CarouselService;
  let element: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarouselService, WindowRef],
    });

    service = TestBed.get(CarouselService);
    element = document.createElement('div');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should display size for carousel items', done => {
    spyOnProperty(element, 'clientWidth').and.returnValue(1140);

    service.getSize(element, itemWidth).subscribe(value => {
      expect(value).toEqual(4);
      done();
    });
  });
});
