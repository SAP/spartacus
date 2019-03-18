import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { Product } from '@spartacus/core';

@Component({
  selector: 'cx-yotporeview',
  templateUrl: './yotporeview.component.html',
  styleUrls: ['./yotporeview.component.css']
})
export class YotporeviewComponent implements OnInit {
  @Input()
  product: Product;

  constructor(
    private elementRef:ElementRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
	var s = document.createElement("script");
	s.type = "text/javascript";
	s.text = "var yotpo_api=new Yotpo.API(yotpo);yotpo_api.refreshWidgets();";
	this.elementRef.nativeElement.appendChild(s);
  }
}
