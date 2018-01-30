import { Component, Input, OnInit } from '@angular/core';
import { AbstractProductComponent } from '../abstract-product-component';
import { ProductLoaderService } from 'app/data/product-loader.service';
import { ChangeDetectorRef } from '@angular/core/src/change_detection/change_detector_ref';

@Component({
  selector: 'y-product-summary',
  templateUrl: './product-summary.component.html',
  styleUrls: ['./product-summary.component.scss']
})
export class ProductSummaryComponent extends AbstractProductComponent {}
