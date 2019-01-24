import {
  Component,
  Input,
  Renderer2,
  ElementRef,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { CmsService, Page, CmsConfig, WindowRef } from '@spartacus/core';
import { Observable, fromEvent } from 'rxjs';
import {
  map,
  filter,
  debounceTime,
  startWith,
  distinctUntilChanged,
  switchMap
} from 'rxjs/operators';

export enum BREAKPOINT {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg'
}

export enum BREAKPOINT_SIZE {
  xs = 600,
  sm = 900,
  md = 1200
}

@Component({
  selector: 'cx-page-layout',
  templateUrl: './page-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageLayoutComponent implements OnInit {
  @Input() section;

  constructor(
    private cms: CmsService,
    private config: CmsConfig,
    private el: ElementRef,
    private renderer: Renderer2,
    private winRef: WindowRef
  ) {}

  ngOnInit() {
    if (this.section) {
      this.cssClass = this.section;
    }
  }

  set cssClass(cl) {
    this.renderer.addClass(this.el.nativeElement, cl);
  }

  get slots$(): Observable<any> {
    return fromEvent(this.window, 'resize').pipe(
      debounceTime(300),
      startWith({ target: this.window }),
      map(event => this.getBreakpoint((<Window>event.target).innerWidth)),
      distinctUntilChanged(),
      switchMap(val =>
        this.page$.pipe(
          map(page => {
            return this.getSlotConfiguration(page.template, val);
          })
        )
      )
    );
  }

  get page$(): Observable<Page> {
    return this.cms.getCurrentPage().pipe(filter(Boolean));
  }

  get templateName$(): Observable<string> {
    return this.page$.pipe(map((page: Page) => page.template));
  }

  protected getBreakpoint(windowWidth: number) {
    const BreakpointSize = Object.keys(BREAKPOINT_SIZE).find(
      b => windowWidth < BREAKPOINT_SIZE[b]
    );
    const breakpoint = BREAKPOINT[BreakpointSize || BREAKPOINT.lg];
    return breakpoint;
  }

  /**
   * load slots from the layout configuration. The breakpoint is used
   * to load a specific configuration for the given breakpoint. If there's
   * no configuration available for the given breakpoint the default slot
   * configuration is returned.
   */
  protected getSlotConfiguration(
    templateUid: string,
    breakpoint: BREAKPOINT
  ): string[] {
    let slots = this.config.layoutSlots[templateUid];
    if (this.section) {
      slots = slots[this.section]
        ? slots[this.section]
        : this.config.layoutSlots[this.section];
    }
    if (!slots) {
      return [];
    }
    return slots[breakpoint]
      ? <string[]>slots[breakpoint]
      : <string[]>slots.slots;
  }

  // protected getSlotConfiguration2(templateUid: string): SlotGroup {
  //   if (this.section) {
  //     return this.config.layoutSlots[templateUid] &&
  //       this.config.layoutSlots[templateUid][this.section] &&
  //       this.config.layoutSlots[templateUid][this.section].slots
  //       ? this.config.layoutSlots[templateUid][this.section]
  //       : this.config.layoutSlots[this.section];
  //   } else {
  //     if (
  //       this.config.layoutSlots[templateUid] &&
  //       this.config.layoutSlots[templateUid].slots
  //     ) {
  //       return this.config.layoutSlots[templateUid];
  //     }
  //   }
  //   return null;
  // }

  get window() {
    return this.winRef.nativeWindow;
  }
}
