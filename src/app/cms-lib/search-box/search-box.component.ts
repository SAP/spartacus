import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AbstractProductComponent } from '../../cms/abstract-product-component';

@Component({
  selector: 'y-searchbox',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent extends AbstractProductComponent implements OnInit {
    // searchBoxForm;
    subject: BehaviorSubject<any>;
    results: Array<any>;

    searchBoxCtrl: FormControl;

    ngOnInit() {

        this.subject = new BehaviorSubject<any>([]);
        this.subject.subscribe((productList) => {
            this.results = productList;
        });

        this.searchBoxCtrl = new FormControl();

        this.searchBoxCtrl.valueChanges.subscribe((value) => {
            this.productLoader.incrementalSearchProducts(this.subject, value);
        });
    }

    onSubmit() {
        console.log('form submit');
    }

}
