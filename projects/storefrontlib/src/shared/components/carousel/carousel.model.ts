export interface CarouselButton {
  visible: boolean;
  disabled: boolean;
  enabled: boolean;
}
export interface CarouselNavigation {
  slides: number[];
  previous: CarouselButton;
  next: CarouselButton;
}
