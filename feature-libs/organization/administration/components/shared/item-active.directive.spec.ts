import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { Subject } from 'rxjs/internal/Subject';
import { ItemActiveDirective } from './item-active.directive';
import { OrganizationItemService } from './organization-item.service';
import { MessageService } from './organization-message/services/message.service';
import { GlobalMessageType } from '@spartacus/core';
import createSpy = jasmine.createSpy;

const mockCode = 'mc1';

@Component({
  selector: 'cx-host',
  template: `<div cxOrgItemActive>TEST</div>`,
})
class TestComponent {}

class MockMessageService {
  add = createSpy('add').and.returnValue(new Subject());
  clear() {}
  close() {}
}

const itemStubActive = {
  active: true,
};

const itemStubInactive = {
  active: false,
};

class MockItemServiceActive implements Partial<OrganizationItemService<any>> {
  key$ = of(mockCode);
  load = createSpy('load').and.returnValue(of());
  error$ = of(false);
  current$ = of(itemStubActive);
}

class MockItemServiceInactive implements Partial<OrganizationItemService<any>> {
  key$ = of(mockCode);
  load = createSpy('load').and.returnValue(of());
  error$ = of(false);
  current$ = of(itemStubInactive);
}

const expectedMessage = {
  message: {
    key: 'organization.notification.disabled',
  },
  type: GlobalMessageType.MSG_TYPE_ERROR,
};

describe('ItemActiveDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let messageService: MessageService;

  function configureTestingModule(itemService) {
    TestBed.configureTestingModule({
      declarations: [ItemActiveDirective, TestComponent],
      providers: [
        {
          provide: OrganizationItemService,
          useClass: itemService,
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

  describe('when item is active', () => {
    beforeEach(() => {
      configureTestingModule(MockItemServiceActive);
    });

    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    it('should not call message service', () => {
      expect(messageService.add).not.toHaveBeenCalled();
    });
  });

  describe('when item is not active', () => {
    beforeEach(() => {
      configureTestingModule(MockItemServiceInactive);
    });

    it('should call message service', () => {
      expect(messageService.add).toHaveBeenCalledWith(expectedMessage);
    });
  });
});
