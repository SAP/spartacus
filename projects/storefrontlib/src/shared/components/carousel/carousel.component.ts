import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICON_TYPE } from '../../../cms-components/misc/icon/index';
import { CarouselItem } from './carousel.model';
import { CarouselService } from './carousel.service';

@Component({
  selector: 'cx-carousel',
  templateUrl: './carousel.component.html',
})
export class CarouselComponent implements OnInit {
  @Input() title: string;

  @Input() items: CarouselItem[];

  /**
   * Specifies the min pixel used per product. This value is used
   * to calculate the amount of items we can fit into the available with
   * of the host element. The number of items is not related the breakpoints,
   * which means that a carousel can be placed in different layouts,
   * regardless of the overall size.
   */
  @Input() minItemPixelSize = 300;

  @Input() indicatorIcon = ICON_TYPE.CIRCLE;
  @Input() previousIcon = ICON_TYPE.CARET_LEFT;
  @Input() nextIcon = ICON_TYPE.CARET_RIGHT;

  /**
   * The group with items which is currently active.
   */
  activeSlide = 0;

  /**
   * The number of items that should be rendered in the carousel.
   */
  size$: Observable<number>;

  constructor(protected el: ElementRef, protected service: CarouselService) {}

  ngOnInit() {
    this.size$ = this.service.getSize(
      this.el.nativeElement,
      this.minItemPixelSize
    );
  }

  select(slide: number) {
    this.activeSlide = slide;
  }
}
