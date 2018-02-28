import { Injectable, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartLoaderService } from '../data/cart-loader.service';
import { CartModelService } from '../data/cart-model.service';
import { AbstractCmsComponent } from '../cms/components/abstract-cms-component';

@Injectable()
export abstract class AbstractCartComponent {
  constructor(
    protected cd: ChangeDetectorRef,
    protected cartLoader: CartLoaderService,
    protected cartModel: CartModelService,
    protected dialog: MatDialog
  ) {}
}
