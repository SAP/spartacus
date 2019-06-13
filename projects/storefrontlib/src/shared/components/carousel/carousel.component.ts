import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ICON_TYPE } from '../../../cms-components/misc/icon/index';
import { CarouselItem } from './carousel.model';
import { CarouselService } from './carousel.service';

@Component({
  selector: 'cx-carousel',
  templateUrl: './carousel.component.html',
})
export class CarouselComponent implements OnInit {
  @Input() title: string;

  private _items: CarouselItem[];
  @Input('items')
  set items(value: CarouselItem[]) {
    this._items = value;
    this.select();
  }
  get items(): CarouselItem[] {
    return this._items;
  }

  /** Indicates the current active item in carousel (if any)  */
  @Input() activeItem: number;

  /**
   * Specifies the min pixel used per product. This value is used
   * to calculate the amount of items we can fit into the available with
   * of the host element. The number of items is not related the breakpoints,
   * which means that a carousel can be placed in different layouts,
   * regardless of the overall size.
   */
  @Input() minItemPixelSize = 300;

  @Input() hideIndicators = false;

  @Input() indicatorIcon = ICON_TYPE.CIRCLE;
  @Input() previousIcon = ICON_TYPE.CARET_LEFT;
  @Input() nextIcon = ICON_TYPE.CARET_RIGHT;

  @Output() open = new EventEmitter<CarouselItem>();

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
    this.size$ = this.service
      .getSize(this.el.nativeElement, this.minItemPixelSize)
      .pipe(tap(() => this.select()));
  }

  select(slide = 0) {
    this.activeSlide = slide;
  }

  onOpen(groupIndex: number, itemIndex: number): void {
    this.select(groupIndex);
    this.open.emit(this.items[groupIndex + itemIndex]);
  }
}
