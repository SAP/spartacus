import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
} from '@angular/core';
import {
  WindowRef,
  CmsScrollToTopComponent,
  ScrollBehavior,
} from '@spartacus/core';
import { take } from 'rxjs/operators';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { ICON_TYPE } from '../../misc/icon/icon.model';
@Component({
  selector: 'cx-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollToTopComponent {
  iconTypes = ICON_TYPE;
  display: boolean;

  protected behavior: ScrollBehavior;
  protected displayThreshold: number;
  protected window: Window | undefined = this.winRef.nativeWindow;

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (this.window) {
      this.display = this.window.scrollY > this.displayThreshold;
    }
  }

  constructor(
    protected winRef: WindowRef,
    protected componentData: CmsComponentData<CmsScrollToTopComponent>
  ) {
    this.componentData.data$.pipe(take(1)).subscribe((data) => {
      this.behavior = data.behavior ?? ScrollBehavior.SMOOTH;
      this.displayThreshold =
        data.displayThreshold ?? this.winRef.nativeWindow?.innerHeight ?? 200;
    });
  }

  scrollToTop(): void {
    if (this.window) {
      this.window.scrollTo({
        top: 0,
        behavior: this.behavior,
      });
      this.display = false;
    }
  }
}
