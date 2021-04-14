import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { GlobalMessageType } from '@spartacus/core';
import { of, Subject } from 'rxjs';
import { ItemExistsDirective } from './item-exists.directive';
import { ItemService } from './item.service';
import { MessageService } from './message/services/message.service';
import createSpy = jasmine.createSpy;

const mockCode = 'mc1';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
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

class MockItemServiceWithError implements Partial<ItemService<any>> {
  key$ = of(mockCode);
  load = createSpy('load').and.returnValue(of());
  error$ = of(true);
}

class MockItemServiceWithoutError implements Partial<ItemService<any>> {
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
          provide: ItemService,
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
