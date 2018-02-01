import { Component, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { AbstractProductComponent } from '../abstract-product-component';

@Component({
  selector: 'y-product-attributes',
  templateUrl: './product-attributes.component.html',
  styleUrls: ['./product-attributes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductAttributesComponent extends AbstractProductComponent {}
