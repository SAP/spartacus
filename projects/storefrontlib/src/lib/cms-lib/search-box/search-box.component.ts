import {
  Component,
  Input,
  ViewEncapsulation,
  OnInit,
  OnDestroy
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { merge, Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoutingService } from '@spartacus/core';
import { SearchBoxComponentService } from './search-box-component.service';
@Component({
  selector: 'cx-searchbox',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [SearchBoxComponentService]
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  searchBoxControl: FormControl = new FormControl();
  isMobileSearchVisible: boolean;

  queryText$: Subject<string> = new Subject();
  subscription: Subscription;

  @Input('queryText')
  set queryText(value: string) {
    this.queryText$.next(value);
    this.searchBoxControl.setValue(value);
  }

  constructor(
    protected service: SearchBoxComponentService,
    private routingService: RoutingService
  ) {}

  ngOnInit() {
    const query$ = this.routingService.routerState$.pipe(
      map(routingData => routingData.state.params.query)
    );

    this.subscription = query$.subscribe(query => {
      this.searchBoxControl.setValue(query);
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  search = (text$: Observable<string>) =>
    this.service.search(merge(text$, this.queryText$));

  public submitSearch() {
    this.service.launchSearchPage(this.searchBoxControl.value);
  }

  selectSuggestion(item) {
    if (typeof item.item === 'string') {
      this.searchBoxControl.setValue(item.item);
      this.submitSearch();
    } else {
      item.preventDefault();
    }
  }

  public onKey(event: any) {
    if (event.key === 'Enter') {
      this.service.launchSearchPage(this.searchBoxControl.value);
    }
  }

  public toggleMobileSearchInput() {
    this.isMobileSearchVisible = !this.isMobileSearchVisible;
  }
}
