import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
} from '@angular/core';
import { CarouselNavigationService } from '../carousel-navigation/carousel-navigation.service';

@Component({
  selector: 'cx-carousel-panel',
  templateUrl: './carousel-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselPanelComponent implements OnInit {
  constructor(
    protected elementRef: ElementRef<HTMLElement>,
    protected navigationService: CarouselNavigationService
  ) {}

  ngOnInit(): void {
    this.navigationService.setContainer(this.elementRef.nativeElement);
  }
}
