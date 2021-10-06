import { Component, Input, NgModule } from '@angular/core';
import { CurrentItemService } from '../current-item.service';
import { FormService } from './form.service';
import createSpy = jasmine.createSpy;

@Component({
  selector: 'cx-org-form',
  template: '<ng-content></ng-content>',
})
class MockFormComponent {
  @Input() i18nRoot;
}

export class MockBudgetFormService {}

class MockCurrentItemService {}
class MockFormService {
  getForm = createSpy('getForm');
}

@NgModule({
  declarations: [MockFormComponent],
  exports: [MockFormComponent],
  providers: [
    {
      provide: CurrentItemService,
      useExisting: MockCurrentItemService,
    },
    {
      provide: FormService,
      useExisting: MockFormService,
    },
  ],
})
export class FormTestingModule {}
