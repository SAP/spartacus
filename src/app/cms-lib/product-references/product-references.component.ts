import { Component, Input} from '@angular/core';
import { AbstractProductComponent } from '../../cms/abstract-product-component';

@Component({
  selector: 'y-product-references',
  templateUrl: './product-references.component.html',
  styleUrls: ['./product-references.component.scss']
})
export class ProductReferencesComponent extends AbstractProductComponent {

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
        if (!this.model || !this.model.productReferenceTypes || !references[this.model.productReferenceTypes]) {
            return;
        }
        references[this.model.productReferenceTypes].forEach((item, index) => {
            if (!this.model.maximumNumberProducts || index < this.model.maximumNumberProducts) {
                this.productCodes.push(item.target.code);
            }
        });
    }
}
