import { Component, ChangeDetectionStrategy } from '@angular/core';
// import { AbstractProductComponent } from '../abstract-product-component';

@Component({
  selector: 'cx-product-references',
  templateUrl: './product-references.component.html',
  styleUrls: ['./product-references.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductReferencesComponent {} /*extends AbstractProductComponent {

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
