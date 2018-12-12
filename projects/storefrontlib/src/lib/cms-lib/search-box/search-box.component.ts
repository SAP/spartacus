import { Component, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { merge, Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { SearchBoxComponentService } from './search-box-component.service';
@Component({
  selector: 'cx-searchbox',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchBoxComponent implements OnInit {
  searchBoxControl: FormControl = new FormControl();
  isMobileSearchVisible: boolean;

  queryText$: Subject<string> = new Subject();

  @Input('queryText')
  set queryText(value: string) {
    this.queryText$.next(value);
    this.searchBoxControl.setValue(value);
  }

  constructor(protected service: SearchBoxComponentService) {}

  ngOnInit() {
    this.service.queryParam$.pipe(take(1)).subscribe(query => {
      if (query) {
        this.searchBoxControl.setValue(query);
      }
    });
  }

  typeahead = (text$: Observable<string>): Observable<string[]> =>
    this.service.typeahead(merge(text$, this.queryText$));

  public submitSearch(): void {
    this.service.launchSearchPage(this.searchBoxControl.value);
  }

  selectSuggestion(item): void {
    if (typeof item.item === 'string') {
      this.searchBoxControl.setValue(item.item);
      this.submitSearch();
    } else {
      item.preventDefault();
    }
  }

  public onKey(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.service.launchSearchPage(this.searchBoxControl.value);
    }
  }

  public toggleMobileSearchInput(): void {
    this.isMobileSearchVisible = !this.isMobileSearchVisible;
  }
}
