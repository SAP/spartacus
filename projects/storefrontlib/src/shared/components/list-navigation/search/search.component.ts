import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ICON_TYPE } from '../../../../cms-components/misc/icon/icon.model';

@Component({
  selector: 'cx-search',
  templateUrl: './search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  @Input()
  placeholder: string;

  @Output()
  searchEvent: EventEmitter<string>;

  searchBox: FormControl = new FormControl();
  iconTypes = ICON_TYPE;

  constructor() {
    this.searchEvent = new EventEmitter<string>();
  }

  onKey(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.search();
    }
  }

  search() {
    if (this.searchBox.value && this.searchBox.value.length) {
      this.searchEvent.emit(this.searchBox.value);
    }
  }
}
