import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { of } from 'rxjs/internal/observable/of';
import { Subject } from 'rxjs/internal/Subject';
import { ItemExistsDirective } from './item-exists.directive';
import { OrganizationItemService } from './organization-item.service';
import { MessageService } from './organization-message/services/message.service';
import { GlobalMessageType } from '@spartacus/core';
import createSpy = jasmine.createSpy;

const mockCode = 'mc1';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'cx-host',
  template: `<div [cxOrgItemExists]>TEST</div>`,
})
class TestComponent {
  form: FormGroup = new FormGroup({});
}

class MockMessageService {
  add = createSpy('add').and.returnValue(new Subject());
  clear() {}
  close() {}
}

class MockItemServiceWithError
  implements Partial<OrganizationItemService<any>> {
  key$ = of(mockCode);
  load = createSpy('load').and.returnValue(of());
  error$ = of(true);
}

class MockItemServiceWithoutError
  implements Partial<OrganizationItemService<any>> {
  key$ = of(mockCode);
  load = createSpy('load').and.returnValue(of());
  error$ = of(false);
}

const expectedMessage = {
  message: {
    key: 'organization.notification.notExist',
  },
  type: GlobalMessageType.MSG_TYPE_ERROR,
};

describe('ItemExistsDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let messageService: MessageService;

  function configureTestingModule(service) {
    TestBed.configureTestingModule({
      declarations: [ItemExistsDirective, TestComponent],
      providers: [
        {
          provide: OrganizationItemService,
          useClass: service,
        },
        {
          provide: MessageService,
          useClass: MockMessageService,
        },
      ],
    }).compileComponents();

    messageService = TestBed.inject(MessageService);
    fixture = TestBed.createComponent(TestComponent);

    fixture.detectChanges();
    component = fixture.componentInstance;
  }

  describe('when there is no error', () => {
    beforeEach(() => {
      configureTestingModule(MockItemServiceWithoutError);
    });

    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    it('should not call message service', () => {
      expect(messageService.add).not.toHaveBeenCalled();
    });
  });

  describe('when there is error', () => {
    beforeEach(() => {
      configureTestingModule(MockItemServiceWithError);
    });

    it('should call message service', () => {
      expect(messageService.add).toHaveBeenCalledWith(expectedMessage);
    });
  });
});
