import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { BaseyotpoService } from './../baseyotpo/baseyotpo.service';
import { Observable } from 'rxjs';
import { Product } from '@spartacus/core';

@Component({
  selector: 'cx-yotporeview',
  templateUrl: './yotporeview.component.html',
  styleUrls: []
})
export class YotporeviewComponent implements OnInit, AfterViewInit {
  product$: Observable<Product>;
  
  constructor(protected baseyotpoService:BaseyotpoService, protected elementRef: ElementRef) { }

  ngOnInit() {
    this.product$ = this.baseyotpoService.getProduct();
  }

  ngAfterViewInit() {
    this.baseyotpoService.afterViewInit(this.elementRef);
  }

}
