import { Component, ElementRef } from '@angular/core';
import { BaseyotpoComponent } from './../baseyotpo/baseyotpo.component';

@Component({
  selector: 'cx-yotpostarrating',
  templateUrl: './yotpostarrating.component.html',
  styleUrls: ['./yotpostarrating.component.css']
})
export class YotpostarratingComponent extends BaseyotpoComponent {
  constructor(protected elementRef:ElementRef) { super(elementRef); }
}
