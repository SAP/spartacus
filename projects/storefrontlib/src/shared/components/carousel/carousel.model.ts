import { ICON_TYPE } from '../../../cms-components/misc/icon/icon.model';

export interface CarouselButton {
  // visible: boolean;
  disabled: boolean;
  icon?: ICON_TYPE;
}

export interface CarouselIndicator {
  position: number;
  /**
   * Indicates whether the indicator is active.
   */
  selected: boolean;
  /**
   * Optional icon type to render the indicator icon.
   *
   * Defaults to the `indicatorIcon` input on the carousel component.
   */
  icon?: ICON_TYPE;
}

export interface CarouselNavigation {
  previous?: CarouselButton;
  next?: CarouselButton;
  indicators?: CarouselIndicator[];
}
