import {
  Component,
  Input,
  Output,
  ChangeDetectionStrategy,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'y-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SortingComponent {
  @Input()
  sortOptions;
  @Input()
  selectedOption: string;
  @Input()
  placeholder: string;
  @Input()
  sortLabels: any;

  @Output()
  sortListEvent: EventEmitter<string>;

  constructor() {
    this.sortListEvent = new EventEmitter<string>();
  }

  sortList(sortCode: string) {
    this.sortListEvent.emit(sortCode);
  }
}
