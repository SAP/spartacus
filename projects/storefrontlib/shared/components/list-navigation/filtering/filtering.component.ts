import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FilterModel } from '@spartacus/core';

@Component({
  selector: 'cx-filtering',
  templateUrl: './filtering.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilteringComponent {
  @Input()
  filterOptions: FilterModel[] | undefined;
  @Input()
  ariaControls: string;
  @Input()
  ariaLabel: string;
  @Input()
  selectedOption: string | undefined;
  @Input()
  placeholder: string;
  @Input()
  filterLabels: { [code: string]: string } | null;

  @Output()
  filterListEvent: EventEmitter<string>;

  constructor() {
    this.filterListEvent = new EventEmitter<string>();
  }

  filterList(filterCode: string): void {
    this.filterListEvent.emit(filterCode);
  }

  get selectedLabel() {
    if (this.selectedOption) {
      return (
        this.filterOptions?.find(
          (filter) => filter.code === this.selectedOption
        )?.name ?? this.filterLabels?.[this.selectedOption]
      );
    }
  }
}
