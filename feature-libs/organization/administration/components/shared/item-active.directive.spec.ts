import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  template: `<div [cxOrgItemActive]="form">TEST</div>`,
})
class TestFormComponent {
  form: FormGroup = new FormGroup({});
}

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

const snapshotStubEdit = {
  snapshot: {
    routeConfig: {
      path: 'edit',
    },
  },
};

const snapshotStubCreate = {
  snapshot: {
    routeConfig: {
      path: 'create',
    },
  },
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
  let component: TestFormComponent;
  let fixture: ComponentFixture<TestFormComponent>;
  let messageService: MessageService;

  function configureTestingModule(itemService, activatedRouteValue) {
    TestBed.configureTestingModule({
      declarations: [ItemActiveDirective, TestFormComponent],
      providers: [
        {
          provide: OrganizationItemService,
          useClass: itemService,
        },
        {
          provide: ActivatedRoute,
          useValue: activatedRouteValue,
        },
        {
          provide: MessageService,
          useClass: MockMessageService,
        },
      ],
    }).compileComponents();

    messageService = TestBed.inject(MessageService);
    fixture = TestBed.createComponent(TestFormComponent);

    fixture.detectChanges();
    component = fixture.componentInstance;
  }

  describe('when item is active', () => {
    beforeEach(() => {
      configureTestingModule(MockItemServiceActive, snapshotStubEdit);
    });

    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    it('should not call message service', () => {
      expect(messageService.add).not.toHaveBeenCalled();
    });

    it('should not disable the form', () => {
      expect(component.form.status).toEqual('VALID');
    });
  });

  describe('when item is not active', () => {
    beforeEach(() => {
      configureTestingModule(MockItemServiceInactive, snapshotStubEdit);
    });

    it('should call message service', () => {
      expect(messageService.add).toHaveBeenCalledWith(expectedMessage);
    });

    it('should disable the form', () => {
      expect(component.form.status).toEqual('DISABLED');
    });
  });

  describe('when in create form', () => {
    beforeEach(() => {
      configureTestingModule(MockItemServiceInactive, snapshotStubCreate);
    });

    it('should not call message service', () => {
      expect(messageService.add).not.toHaveBeenCalled();
    });

    it('should not disable the form', () => {
      expect(component.form.status).toEqual('VALID');
    });
  });
});
