import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  Optional,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { CmsSearchBoxComponent } from '@spartacus/core';
import { CmsComponentData } from 'projects/storefrontlib/src/cms-structure';
import { Subject } from 'rxjs';
import { ICON_TYPES } from '../../../cms-components/misc/icon/index';
import { SearchBoxComponentService } from './search-box-component.service';
@Component({
  selector: 'cx-searchbox',
  templateUrl: './search-box.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBoxComponent {
  iconTypes = ICON_TYPES;

  searchBoxControl: FormControl = new FormControl();

  queryText$: Subject<string> = new Subject();

  private ignoreBlur = false;

  @HostBinding('class.open') showResults = false;

  @Input('queryText')
  set queryText(value: string) {
    this.searchBoxControl.setValue(value);
  }

  constructor(
    @Optional()
    protected componentData: CmsComponentData<CmsSearchBoxComponent>,
    protected service: SearchBoxComponentService
  ) {}

  searchResults$ = this.service.typeahead(
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

  public clear() {
    this.searchBoxControl.reset();
  }

  public search(event: KeyboardEvent): void {
    this.close(event);
    this.service.launchSearchPage(this.searchBoxControl.value);
  }
}
