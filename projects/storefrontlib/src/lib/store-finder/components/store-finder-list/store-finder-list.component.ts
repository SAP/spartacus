import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '../../store';
import { SearchConfig } from '../../models/search-config';

@Component({
  selector: 'y-store-finder-list',
  templateUrl: './store-finder-list.component.html',
  styleUrls: ['./store-finder-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoreFinderListComponent implements OnInit {
  @Input() query;

  locations$: Observable<any>;
  searchConfig: SearchConfig = {
    currentPage: 0
  };

  constructor(private store: Store<fromStore.StoresState>) {}

  ngOnInit() {
    this.locations$ = this.store.select(fromStore.getAllStores);
  }

  viewPage(pageNumber: number) {
    this.searchConfig = { ...this.searchConfig, currentPage: pageNumber };
    this.store.dispatch(
      new fromStore.FindStores({
        queryText: this.query,
        searchConfig: this.searchConfig
      })
    );
  }
}
