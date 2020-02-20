import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'cx-checktable',
  templateUrl: './checktable.component.html',
})
export class ChecktableComponent {
  @Input()
  columns: Array<{
    key: string;
    value: string;
    cxRoute?: string;
    checked?: boolean;
  }>;

  @Input()
  tableData: Array<any>;

  @Output() toggle = new EventEmitter<any>();

  selectedValues: Array<any>;

  onToggle(event, row) {
    this.toggle.emit({ value: event.target.value, row });
  }
}
