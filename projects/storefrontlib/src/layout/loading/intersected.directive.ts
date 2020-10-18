import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { IntersectionOptions } from './intersection.model';
import { IntersectionService } from './intersection.service';

@Directive({
  selector: '[cxIntersected]',
})
export class IntersectedDirective implements OnInit, OnDestroy {
  private rendered = false;

  // we make the config observable, so that we can dynamically change it.
  protected config$: BehaviorSubject<IntersectionOptions> = new BehaviorSubject(
    {
      rootMargin: '300px',
      threshold: 0.9,
    }
  );

  protected subscription: Subscription;

  @Output() intersect: EventEmitter<boolean> = new EventEmitter();

  @Input('cxIntersected') set config(config: IntersectionOptions) {
    if (config) {
      this.config$.next(config);
    }
  }

  @Input('forceIntersect') set forceIntersect(force: any) {
    if (force) {
      this.render();
    }
  }

  constructor(
    protected templateRef: TemplateRef<any>,
    protected viewContainer: ViewContainerRef,
    protected intersectionService: IntersectionService,
    protected elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.subscription = this.config$
      .pipe(
        switchMap((config) =>
          this.intersectionService
            .intersects(this.host, config)
            .pipe(debounceTime(300))
        )
      )
      .subscribe((intersects) => {
        if (intersects) {
          this.render();
        }
        this.intersect.emit(intersects);
      });
  }

  protected render() {
    if (!this.rendered) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.rendered = true;
    }
  }

  protected get host(): HTMLElement {
    return (this.elementRef.nativeElement as HTMLElement).parentElement;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
