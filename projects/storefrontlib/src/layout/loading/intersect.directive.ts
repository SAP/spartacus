import { Directive, ElementRef, Input, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { IntersectionOptions } from './intersection.model';
import { IntersectionService } from './intersection.service';

@Directive({
  selector: '[cxIntersect]',
  exportAs: 'cxIntersect',
})
export class IntersectDirective {
  // we make the config observable, so that we can dynamically change it.
  protected config$: BehaviorSubject<IntersectionOptions> = new BehaviorSubject(
    this.config
  );

  /**
   * Merge the config with the default intersection config.
   */
  @Input('cxIntersect') set intersectionConfig(config: IntersectionOptions) {
    if (config) {
      this.config$.next({ ...this.config, ...config });
    }
  }

  /**
   * Emits any intersection based on the intersection configuration.
   */
  @Output() intersect: Observable<boolean> = this.config$.pipe(
    switchMap((config) =>
      this.intersectionService
        .intersects(this.host, config)
        .pipe(debounceTime(300))
    )
  );

  constructor(
    protected intersectionService: IntersectionService,
    protected elementRef: ElementRef
  ) {}

  protected get config(): IntersectionOptions {
    // TODO: read the default config from the intersectionService->LayoutConfig
    // this requires a change though and would introduce threshold(s) to the config.
    return {
      rootMargin: '300px',
      threshold: 0.9,
    };
  }

  protected get host(): HTMLElement {
    return this.elementRef
      ? this.elementRef.nativeElement
      : (this.elementRef.nativeElement as HTMLElement).parentElement;
  }
}
