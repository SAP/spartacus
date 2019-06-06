import { Component, ElementRef, Input } from '@angular/core';
import { Product } from '@spartacus/core';
import { CarouselService } from './carousel.service';

@Component({
  selector: 'cx-carousel',
  templateUrl: './carousel.component.html',
})
export class CarouselComponent {
  @Input() items: Product[];
  @Input() title: string;

  @Input() minItemPixelSize = 360;

  activeSlide = 0;

  size$ = this.service.getSize(this.el.nativeElement, this.minItemPixelSize);

  constructor(protected el: ElementRef, protected service: CarouselService) {}

  select(slide: number) {
    this.activeSlide = slide;
  }

  next() {
    this.activeSlide++;
  }

  previous() {}
}
