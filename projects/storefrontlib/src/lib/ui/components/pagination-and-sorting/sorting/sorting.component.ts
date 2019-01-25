import {
  Component,
  Input,
  Output,
  ChangeDetectionStrategy,
  EventEmitter
} from '@angular/core';
import { SortModel } from '@spartacus/core';

@Component({
  selector: 'cx-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
}
