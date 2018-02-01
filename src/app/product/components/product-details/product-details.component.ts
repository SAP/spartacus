import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AbstractProductComponent } from '../abstract-product-component';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'y-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailsComponent extends AbstractProductComponent {}
