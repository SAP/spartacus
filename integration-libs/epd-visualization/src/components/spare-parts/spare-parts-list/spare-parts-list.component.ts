import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductReference } from '@spartacus/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  SparePartListItem,
  SparePartsList,
} from './model/spare-part-list.model';
import { SparePartsListService } from './spare-parts-list.service';

@Component({
  selector: 'cx-spare-parts-list',
  templateUrl: './spare-parts-list.component.html',
  providers: [SparePartsListService],
})
export class SparePartsListComponent implements OnInit {
  constructor(protected sparePartsListServices: SparePartsListService) {}

  private selectedProductCodes$ = new Subject<string[]>();

  @Input() title: string;
  @Input() singleSelection = true;

  @Input('selectedProductCodes')
  set selectedProductCodes(selectedProductCodes: string[]) {
    this._selectedProductCodes = selectedProductCodes;
    this.selectedProductCodes$.next(selectedProductCodes);
  }
  get selectedProductCodes(): string[] {
    return this._selectedProductCodes;
  }
  _selectedProductCodes: string[];
  @Output() selectedProductCodesChange = new EventEmitter<string[]>();

  highlightedProductCodes$: Observable<string[]>;

  model: SparePartsList = {
    itemsPerSlide: 8,
    activeSlideStartIndex: 0,
  };

  currentProductCode$: Observable<string> =
    this.sparePartsListServices.getCurrentProductCode$();

  productReferences$: Observable<ProductReference[]> =
    this.sparePartsListServices.getProductReferences$(this.currentProductCode$);

  items$: Observable<SparePartListItem[]> =
    this.sparePartsListServices.getSparePartItems$(
      this.productReferences$,
      this.selectedProductCodes$
    );

  ngOnInit(): void {
    this.items$.pipe(
      tap((items) => {
        const firstHighlightedItemIndex = items.findIndex(
          (item) => item.highlighted
        );
        if (firstHighlightedItemIndex !== -1) {
          this.model.activeSlideStartIndex =
            firstHighlightedItemIndex -
            (firstHighlightedItemIndex % this.model.itemsPerSlide);
        }
      })
    );
  }

  selectInList(productCode: string): void {
    this.selectedProductCodesChange.emit([productCode]);
    this.selectedProductCodes$.next([productCode]);
  }
}
