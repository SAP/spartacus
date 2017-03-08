import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';

import { AbstractProductComponent } from '../../cms/abstract-product-component';

@Component({
  selector: 'y-searchbox',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent extends AbstractProductComponent {
    
    myControl = new FormControl();
    
    filteredOptions: Observable<string[]>;

    productList;
    subject: BehaviorSubject<any[]>;


    protected fetchData() {
        const pageSize = this.getMaxProductLength();

        this.subject = new BehaviorSubject<any>([]);
        this.productLoader.incrementalSearchProducts(this.subject, '', pageSize);
        this.myControl.valueChanges.subscribe((value) => {
            if (this.meetsLength(value)) {
                this.productLoader.incrementalSearchProducts(this.subject, value, pageSize);
            }
        });
    }

    onKey(event: any) {
        if (event.key === 'Enter') {
            this.router.navigate(['/search', this.myControl.value]);
        }
    }
    
    meetsLength(value: string): boolean {
        return true;
        // return this.model.minCharactersBeforeRequest && value.length >= this.model.minCharactersBeforeRequest;
    }

    getMaxProductLength() {
        return this.model.maxProducts;
    }

}
