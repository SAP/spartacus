import { TestBed } from '@angular/core/testing';
import { WindowRef } from '@spartacus/core';
import { firstValueFrom } from 'rxjs';
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

  it('should return 4 items per slide', async () => {
    vi.spyOn(element, 'clientWidth', 'get').mockReturnValue(1000);

    const value = await firstValueFrom(
      service.getItemsPerSlide(element, '250px')
    );
    expect(value).toEqual(4);
  });

  it('should return 2 items per slide', async () => {
    vi.spyOn(element, 'clientWidth', 'get').mockReturnValue(500);

    const value = await firstValueFrom(
      service.getItemsPerSlide(element, '250px')
    );
    expect(value).toEqual(2);
  });

  it('should round down the items per slide', async () => {
    vi.spyOn(element, 'clientWidth', 'get').mockReturnValue(999);

    const value = await firstValueFrom(
      service.getItemsPerSlide(element, '250px')
    );
    expect(value).toEqual(3);
  });

  it('should return 1 item per slide in case of 100%', async () => {
    vi.spyOn(element, 'clientWidth', 'get').mockReturnValue(1000);

    const value = await firstValueFrom(
      service.getItemsPerSlide(element, '100%')
    );
    expect(value).toEqual(1);
  });
});
