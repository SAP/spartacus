import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewChild,
} from '@angular/core';
import { FocusConfig, FocusDirective } from '@spartacus/storefront';
import { CarouselLoaderService } from '../carousel-loader.service';
import { CarouselNavigationService } from './carousel-navigation.service';

@Component({
  selector: 'cx-carousel-navigation',
  templateUrl: './carousel-navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselNavigationComponent {
  constructor(
    protected navigationService: CarouselNavigationService,
    protected carouselLoaderService: CarouselLoaderService
  ) {}

  @Input() readonly focusConfig: FocusConfig;

  @HostBinding('class.freeze') _freeze = false;

  @ViewChild('focusRef', { read: FocusDirective }) focusRef!: FocusDirective;

  readonly navigation$ = this.navigationService.navigation$;

  handlePrefetch(value?: number) {
    this.carouselLoaderService.prefetch(value);
  }

  handlePrevious() {
    this.navigationService.openPreviousSlide();
  }

  handleNext() {
    this.navigationService.openNextSlide();
  }

  handleIndicator(index: number) {
    this.freeze();
    this.navigationService.openSlide(index);
  }

  /**
   * Set's the freeze class on the host element. This class is used in CSS to block
   * interaction (`pointer-event: none`) with the panel, as otherwise a mouse hover
   * would destroy the scroll animation.
   */
  protected freeze() {
    this._freeze = true;
    window.setTimeout(() => {
      this._freeze = false;
    }, 500);
  }
}
