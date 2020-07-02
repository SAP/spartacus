import { Component, Input, NgModule, Output } from '@angular/core';

@Component({
  template: '',
  selector: 'cx-table',
})
class MockTableComponent {
  @Input() dataset: number;
  @Output() paginateEvent;
  @Output() sortEvent;
}

const mockComponents = [MockTableComponent];

@NgModule({
  declarations: mockComponents,
  exports: mockComponents,
})
export class TableTestingModule {}
