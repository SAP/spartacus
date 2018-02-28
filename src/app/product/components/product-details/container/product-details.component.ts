import {
  Component,
  OnChanges,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../store';

<<<<<<< HEAD:src/app/product/components/product-details/container/product-details.component.ts
import { ComponentWrapperComponent } from '../../../../cms/components/component-wrapper/component-wrapper.component';
=======
>>>>>>> develop:src/app/product/components/product-details/product-details.component.ts

@Component({
  selector: 'y-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailsComponent implements OnChanges {
  @Input() productCode: string;
  product$: Observable<any>;

  // @ViewChild(ComponentWrapperComponent) cmsComponent: ComponentWrapperComponent;

  constructor(protected store: Store<fromStore.ProductsState>) {}

  ngOnChanges() {
    this.product$ = this.store.select(
      fromStore.getSelectedProductFactory(this.productCode)
    );
  }
}
