import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';

@Component({
  template: '',
  selector: 'cx-table',
})
export class MockTableComponent {
  @Input() dataset: number;
  @Output() paginateEvent;
  @Output() sortEvent = new EventEmitter();
}

const mockComponents = [MockTableComponent];

@NgModule({
  declarations: mockComponents,
  exports: mockComponents,
})
export class TableTestingModule {}
