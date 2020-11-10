import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { BreakpointService } from '../../../../layout/breakpoint/breakpoint.service';
import { SplitViewService } from '../split-view.service';

/**
 * The split-view component supports an unlimited number of nested views. The component
 * is a host to those view components and doesn't add any restrictions to it's content;
 * content is projected as-is.
 *
 * ```html
 * <cx-split-view>
 *   <cx-view></cx-view>
 *   <cx-view></cx-view>
 *   <any-wrapper>
 *     <cx-view></cx-view>
 *   </any-wrapper>
 * </cx-split-view>
 * ```
 *
 * The split view component is only concerned with tracking the underlying _visible_
 * view components, so that the `lastVisibleView` can be updated accordingly. The actual
 * visibility of views is controlled by CSS. To allow for maximum flexibility, the CSS
 * implementation is using CSS variables. The `lastVisibleView` is bind to the
 * `--cx-active-view` on the host, so that all descendants views will inherit the
 * property conveniently.
 */
@Component({
  selector: 'cx-split-view',
  templateUrl: './split-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SplitViewService],
})
export class SplitViewComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  /**
   * Sets the default hide mode for views. This mode is useful in case views are dynamically being created,
   * for example when they are created by router components.
   *
   * The mode defaults to true, unless this is the first view; the first view is never hidden.
   */
  @Input()
  set hideMode(mode: boolean) {
    this.splitService.defaultHideMode = mode;
  }

  /**
   * Indicates the last visible view in the range of views that is visible. This
   * is bind to a css variable `--cx-active-view` so that the experience
   * can be fully controlled by css.
   */
  @HostBinding('style.--cx-active-view')
  @HostBinding('attr.active-view')
  lastVisibleView = 1;

  constructor(
    protected splitService: SplitViewService,
    protected breakpointService: BreakpointService,
    protected elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.splitService
        .getActiveView()
        .subscribe(
          (lastVisible: number) => (this.lastVisibleView = lastVisible + 1)
        )
    );
    this.subscription.add(
      this.breakpointService.breakpoint$.subscribe(() => {
        this.splitService.updateSplitView(this.splitViewCount);
      })
    );
  }

  /**
   * Returns the maximum number of views per split-view. The number is based on the
   * CSS custom property `--cx-max-views`.
   */
  protected get splitViewCount(): number {
    return Number(
      getComputedStyle(this.elementRef.nativeElement).getPropertyValue(
        '--cx-max-views'
      )
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
