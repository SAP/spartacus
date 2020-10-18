import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { SelectFocusUtility } from '../a11y';
import { PersistFocusService } from '../a11y/keyboard-focus/persist/persist-focus.service';
import { IntersectionService } from './intersection.service';

@Directive({
  selector: '[cxIntersect]',
})
export class IntersectionDirective implements OnInit {
  // @Output('cxIntersected') x = new EventEmitter();

  // @Output() cxIntersected: EventEmitter<any> = new EventEmitter();
  // @HostBinding('class.intersected') isIntersected = false;

  @Output() intersect: EventEmitter<boolean> = new EventEmitter();

  // @Input() @HostBinding('attr.tabindex') tabindex: number;

  constructor(
    protected elementRef: ElementRef,
    protected intersectionService: IntersectionService,
    protected cd: ChangeDetectorRef,
    protected focus: SelectFocusUtility,
    protected persistFocusService: PersistFocusService
  ) {}

  ngOnInit() {
    this.intersectionService
      .intersects(this.elementRef.nativeElement, {
        rootMargin: '0px',
        threshold: 0.9,
      })
      .pipe(debounceTime(300))
      .subscribe((i) => {
        this.intersect.emit(i);

        // this.isIntersected = i;
        // this.cd.markForCheck();

        // console.log(this.tabindex, i);
        // this.focus
        //   .findFocusable(this.elementRef.nativeElement, true)
        //   .forEach((el) => {
        //     let index = el.tabIndex;
        //     if (i) {
        //       index++;
        //     } else {
        //       index--;
        //     }
        //     el.tabIndex = index;
        //     //  < 0 ? 0 : index
        //     console.log(el.tabIndex);
        //     if(i) {
        //       this.persistFocusService.
        //     }
        //   });
      });
  }
}
