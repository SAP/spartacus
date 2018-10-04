import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchBoxComponentService } from './search-box-component.service';

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

  constructor(protected service: SearchBoxComponentService) {}

  search = this.service.search;

  public submitSearch() {
    this.service.launchSearchPage(this.searchBoxControl.value);
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
