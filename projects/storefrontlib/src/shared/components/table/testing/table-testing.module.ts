import {
  Component,
  EventEmitter,
  Injectable,
  Input,
  NgModule,
  Output,
} from '@angular/core';
import { Observable, of } from 'rxjs';
import { TableStructure } from '../table.model';
import { TableService } from '../table.service';

@Component({
  template: '',
  selector: 'cx-table',
})
class MockTableComponent {
  @Input() dataset: number;
  @Output() paginateEvent;
  @Output() sortEvent = new EventEmitter();
}

const mockComponents = [MockTableComponent];

@Injectable()
class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
  getConfig() {}
}

@NgModule({
  declarations: mockComponents,
  exports: mockComponents,
  providers: [
    {
      provide: TableService,
      useClass: MockTableService,
    },
  ],
})
export class TableTestingModule {}
