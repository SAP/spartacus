import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnDestroy,
  Input,
} from '@angular/core';
import { Subscription } from 'rxjs';
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
 * `--cx-last-visible-view` on the host, so that all descendants views will inherit the
 * property conveniently.
 */
@Component({
  selector: 'cx-split-view',
  templateUrl: './split-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SplitViewService],
})
export class SplitViewComponent implements OnDestroy {
  /**
   * Indicates the last visible view in the range of views that is visible. This
   * is bind to a css variable `--cx-last-visible-view` so that the experience
   * can be fully controlled by css.
   */
  @HostBinding('style.--cx-last-visible-view')
  @HostBinding('attr.last-visible-view')
  lastVisibleView = 1;

  @HostBinding('style.--cx-max-views')
  @HostBinding('attr.max-views')
  @Input()
  maxViews;

  protected subscription: Subscription = this.splitService
    .visibleViewCount()
    .subscribe((lastVisible: number) => (this.lastVisibleView = lastVisible));

  constructor(protected splitService: SplitViewService) {}

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
