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

  @Output() toggle = new EventEmitter<any[]>();

  selectedValues: Array<any>;

  onToggle(event, row) {
    // console.log(event.target.value)
    if (event.target.value = 'on') {
      this.toggle.emit(row);
    }
    // console.log(row)
    // const checkedOptions = this.tableData.filter(x => x.options);
    // console.log(checkedOptions);
    // this.selectedValues = checkedOptions.map(x => x.code);
    // console.log(this.selectedValues);
    // this.toggle.emit(checkedOptions);
  }

  // ngOnChanges() {
  //   this.selectedValues.forEach(value => {
  //     const element = this.tableData.find(x => x.value === value);
  //     if (element) {
  //       element.checked = true;
  //     }
  //    });
  // }
}
