import { Injectable } from '@angular/core';
import { AbstractCmsComponent } from '../cms/components/abstract-cms-component';

@Injectable()
export abstract class AbstractCartComponent extends AbstractCmsComponent {
  /*constructor(
    protected cd: ChangeDetectorRef,
    //protected cmsService: CmsService,
    protected cartLoader: CartLoaderService,
    protected cartModel: CartModelService,
    protected dialog: MatDialog
  ) {
    //super(cd, cmsService);
  }*/
}
