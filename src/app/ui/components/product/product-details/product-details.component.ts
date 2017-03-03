import { Component, OnInit } from '@angular/core';
import { AbstractProductComponent } from '../abstract-product-component';

@Component({
  selector: 'y-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent extends AbstractProductComponent {

}
