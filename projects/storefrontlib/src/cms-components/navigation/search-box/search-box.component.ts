import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  Optional,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { CmsSearchBoxComponent } from '@spartacus/core';
import { CmsComponentData } from 'projects/storefrontlib/src/cms-structure';
import { ICON_TYPES } from '../../../cms-components/misc/icon/index';
import { SearchBoxComponentService } from './search-box-component.service';
@Component({
  selector: 'cx-searchbox',
  templateUrl: './search-box.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBoxComponent {
  searchBoxControl: FormControl = new FormControl();

  /**
   * Sets the search box input field
   */
  @Input('queryText')
  set queryText(value: string) {
    this.searchBoxControl.setValue(value);
  }

  iconTypes = ICON_TYPES;
  private ignoreBlur = false;
  @HostBinding('class.open') showResults = false;

  constructor(
    protected searchBoxComponentService: SearchBoxComponentService,
    @Optional()
    protected componentData: CmsComponentData<CmsSearchBoxComponent>
  ) {}

  searchResults$ = this.searchBoxComponentService.typeahead(
    this.searchBoxControl.valueChanges,
    this.componentData ? this.componentData.data$ : null
  );

  onBlur(event: UIEvent) {
    if (!this.ignoreBlur) {
      this.showResults = false;
      if (event && event.target) {
        (<HTMLElement>event.target).blur();
      }
    }
    this.ignoreBlur = false;
  }

  onFocus(event: UIEvent) {
    // put cursor to the end of the text
    const textLength = (<HTMLInputElement>event.target).value.length;
    (<HTMLInputElement>event.target).selectionStart = textLength;
    (<HTMLInputElement>event.target).selectionEnd = textLength;
    this.showResults = true;
  }

  disableClose() {
    this.ignoreBlur = true;
  }

  close(event: UIEvent) {
    this.onBlur(event);
  }

  /**
   * Clears the search box input field
   */
  public clear() {
    this.searchBoxControl.reset();
  }

  /**
   * Closes the searchbox and opens the search result page.
   */
  public search(event: KeyboardEvent): void {
    this.close(event);
    this.searchBoxComponentService.launchSearchPage(
      this.searchBoxControl.value
    );
  }
}
