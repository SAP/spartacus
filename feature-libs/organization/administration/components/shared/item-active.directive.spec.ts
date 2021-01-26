import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GlobalMessageType, RoutingService } from '@spartacus/core';
import { of, Subject } from 'rxjs';
import { ItemActiveDirective } from './item-active.directive';
import { ItemService } from './item.service';
import { MessageService } from './message/services/message.service';

import createSpy = jasmine.createSpy;

const mockCode = 'mc1';

@Component({
  // tslint:disable-next-line: component-selector
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
  uid: 'test-id',
};

class MockItemServiceActive implements Partial<ItemService<any>> {
  key$ = of(mockCode);
  load = createSpy('load').and.returnValue(of());
  error$ = of(false);
  current$ = of(itemStubActive);
}

class MockItemServiceInactive implements Partial<ItemService<any>> {
  key$ = of(mockCode);
  load = createSpy('load').and.returnValue(of());
  error$ = of(false);
  current$ = of(itemStubInactive);
}

const expectedMessage = {
  message: {
    key: 'organization.notification.disabled',
    params: { item: { active: false, uid: 'test-id' } },
  },
  type: GlobalMessageType.MSG_TYPE_ERROR,
};

class MockRoutingService implements Partial<RoutingService> {
  go = createSpy('go');
  getRouterState = createSpy('getRouterState').and.returnValue(
    of({
      state: { context: { id: '/organization/test-category' } },
    })
  );
}

const expectedRedirectUrl = ['/organization/test-category', 'test-id'];

describe('ItemActiveDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let messageService: MessageService;
  let routingService: RoutingService;

  function configureTestingModule(itemService) {
    TestBed.configureTestingModule({
      declarations: [ItemActiveDirective, TestComponent],
      providers: [
        {
          provide: ItemService,
          useClass: itemService,
        },
        {
          provide: MessageService,
          useClass: MockMessageService,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
      ],
    }).compileComponents();

    messageService = TestBed.inject(MessageService);
    routingService = TestBed.inject(RoutingService);
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

    it('should not redirect', () => {
      expect(routingService.go).not.toHaveBeenCalled();
    });
  });

  describe('when item is not active', () => {
    beforeEach(() => {
      configureTestingModule(MockItemServiceInactive);
    });

    it('should call message service', () => {
      expect(messageService.add).toHaveBeenCalledWith(expectedMessage);
    });

    it('should redirect to root page', () => {
      expect(routingService.go).toHaveBeenCalledWith(expectedRedirectUrl);
    });
  });
});
