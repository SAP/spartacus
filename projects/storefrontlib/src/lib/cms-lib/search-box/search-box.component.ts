import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchBoxComponentService } from './search-box-component.service';
import { merge, Observable, Subject } from 'rxjs';

@Component({
  selector: 'y-searchbox',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [SearchBoxComponentService]
})
export class SearchBoxComponent {
  searchBoxControl: FormControl = new FormControl();
  isMobileSearchVisible: boolean;

  queryText$: Subject<string> = new Subject();

  @Input('queryText')
  set queryText(value: string) {
    this.queryText$.next(value);
    this.searchBoxControl.setValue(value);
  }

  constructor(protected service: SearchBoxComponentService) {}

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
