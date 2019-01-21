import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SortModel } from '@spartacus/core';

@Component({
  selector: 'cx-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss']
})
export class SortingComponent {
  @Input()
  sortOptions: SortModel[];
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

  sortList(sortCode: string): void {
    this.sortListEvent.emit(sortCode);
  }
}
