import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  Renderer2
} from '@angular/core';
import { AbstractProductComponent } from '../abstract-product-component';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ProductLoaderService } from '../../../../data/product-loader.service';
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'y-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent extends AbstractProductComponent {
  selectedIndex = 0;

  // This is for opening the reviews tab when the review button above
  // the product image is clicked
  selectedIndexChange(val) {
    this.selectedIndex = val;
  }
}
