import { Component, ElementRef } from '@angular/core';
import { BaseyotpoComponent } from './../baseyotpo/baseyotpo.component';

@Component({
  selector: 'cx-yotporeview',
  templateUrl: './yotporeview.component.html',
  styleUrls: ['./yotporeview.component.css']
})
export class YotporeviewComponent extends BaseyotpoComponent {
  constructor(protected elementRef:ElementRef) { super(elementRef); }
}