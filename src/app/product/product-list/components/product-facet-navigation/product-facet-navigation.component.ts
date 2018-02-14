import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'y-product-facet-navigation',
  templateUrl: './product-facet-navigation.component.html',
  styleUrls: ['./product-facet-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFacetNavigationComponent {

    @Input() activeFacetValueCode;
    @Input() searchResult;
    @Output() filter: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private cd: ChangeDetectorRef
    ) { }
    
    toggleValue(query: string) {
        this.filter.emit(query);
        // this.cd.markForCheck();
    }

 }
