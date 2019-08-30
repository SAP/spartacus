import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { YotpoService } from './../service/yotpo.service';
import { Observable } from 'rxjs';
import { Product } from '@spartacus/core';

@Component({
  selector: 'cx-yotpo-star-rating',
  templateUrl: './yotpo-star-rating.component.html',
  styleUrls: [],
})
export class YotpostarratingComponent implements OnInit, AfterViewInit {
  product$: Observable<Product>;

  constructor(
    protected yotpoService: YotpoService,
    protected elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.product$ = this.yotpoService.getProduct();
  }

  ngAfterViewInit() {
    this.yotpoService.addYotpoInitWidgetsScript(this.elementRef);
  }
}
