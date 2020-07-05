import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';

@Component({
  selector: 'cx-pagination',
  template: '',
})
export class MockPaginationComponent {
  @Input() pagination;
  @Output() viewPageEvent = new EventEmitter();
}

const mockComponents = [MockPaginationComponent];

@NgModule({
  declarations: mockComponents,
  exports: mockComponents,
})
export class PaginationTestingModule {}
