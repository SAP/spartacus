import { Input, OnInit, ElementRef } from '@angular/core';
import { Product } from '@spartacus/core';

export abstract class BaseyotpoComponent implements OnInit {
  @Input()
  product: Product;

  constructor(protected elementRef:ElementRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
	var s = document.createElement("script");
	s.type = "text/javascript";
	s.text = "function callYotpo() { if (typeof Yotpo.API === 'function') { var yotpo_api=new Yotpo.API(yotpo);yotpo_api.refreshWidgets(); } else { setTimeout(function() { callYotpo(); }, 1000);} } callYotpo();";
	this.elementRef.nativeElement.appendChild(s);
  }

}
