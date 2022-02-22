import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { SortModel } from '@spartacus/core';

@Component({
  selector: 'cx-sorting',
  templateUrl: './sorting.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortingComponent {
  @Input()
  sortOptions: SortModel[];
  @Input()
  selectedOption: string;
  @Input()
  placeholder: string;
  @Input()
  sortLabels: { [code: string]: string };

  @Output()
  sortListEvent: EventEmitter<string>;

  constructor() {
    this.sortListEvent = new EventEmitter<string>();
  }

  sortList(sortCode: string): void {
    this.sortListEvent.emit(sortCode);
  }

  get selectedLabel() {
    return (
      this.sortOptions?.find((sort) => sort.code === this.selectedOption)
        ?.name ?? this.sortLabels?.[this.selectedOption]
    );
  }
}
