import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ProductReference } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { ProductReferencesService } from './product-references.component.service';
// import { AbstractProductComponent } from '../abstract-product-component';

@Component({
  selector: 'cx-product-references',
  templateUrl: './product-references.component.html',
  styleUrls: ['./product-references.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductReferencesComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  references$: Observable<ProductReference[]>;

  constructor(public productReferencesService: ProductReferencesService) {}

  ngOnInit() {
    this.productReferencesService.setTitle();
    this.productReferencesService.setProductReferenceTypes();
    this.subscription.add(
      this.productReferencesService
        .getReferenceList()
        .subscribe(data => console.log('yesss', data[0]))
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
} /*extends AbstractProductComponent {

    @Input() productCode;

    productCodes: Array<String> = [];

    protected fetchData() {
        // load the product data by context parameters
        if (this.contextParameters.productCode) {
            this.productLoader.loadReferences(this.contextParameters.productCode);
            this.productLoader.getSubscription(this.contextParameters.productCode + 'references').subscribe((refData) => {
                if (refData) {
                    this.createCodeList(refData);
                    this.cd.detectChanges();
                }
            });
        }
        super.fetchData();
    }

    createCodeList(references) {
        if (!this.component || !this.component.productReferenceTypes || !references[this.component.productReferenceTypes]) {
            return;
        }
        references[this.component.productReferenceTypes].forEach((item, index) => {
            if (!this.component.maximumNumberProducts || index < this.component.maximumNumberProducts) {
                this.productCodes.push(item.target.code);
            }
        });
    }
}*/
