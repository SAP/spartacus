import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
} from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { SharedCarouselService } from '../shared-carousel.service';
import { ProductReferencesService } from './product-references.component.service';

@Component({
  selector: 'cx-product-references',
  templateUrl: './product-references.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductReferencesComponent implements OnInit {
  private window: Window;

  constructor(
    winRef: WindowRef,
    private el: ElementRef,
    public productReferencesService: ProductReferencesService,
    public sharedCarouselService: SharedCarouselService
  ) {
    this.window = winRef.nativeWindow;
  }

  ngOnInit() {
    this.productReferencesService.setTitle();
    this.sharedCarouselService.setItemSize(this.window, this.el.nativeElement);
    this.productReferencesService.setReferenceList();
    this.sharedCarouselService.setItemAsActive(0);
  }
}
