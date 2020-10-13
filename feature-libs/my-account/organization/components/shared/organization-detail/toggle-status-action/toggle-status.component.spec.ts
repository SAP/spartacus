import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { Budget } from '@spartacus/my-account/organization/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { of, Subject } from 'rxjs';
import { OrganizationItemService } from '../../organization-item.service';
import { ConfirmationMessageData } from '../../organization-message/confirmation/confirmation-message.model';
import { MessageService } from '../../organization-message/services/message.service';
import { ToggleStatusComponent } from './toggle-status.component';

class MockMessageService {
  add() {
    return new Subject();
  }
  close() {}
}

class MockOrganizationItemService {
  current$ = of();
  update() {
    return of();
  }
}

describe('ToggleStatusComponent', () => {
  let component: ToggleStatusComponent<Budget>;
  let fixture: ComponentFixture<ToggleStatusComponent<Budget>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        UrlTestingModule,
        I18nTestingModule,
      ],
      declarations: [ToggleStatusComponent],

      providers: [
        {
          provide: MessageService,
          useClass: MockMessageService,
        },
        {
          provide: OrganizationItemService,
          useClass: MockOrganizationItemService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  describe('isDisabled', () => {
    it('should use disabled input', () => {
      component.disabled = true;
      expect(component.isDisabled({ orgUnit: { active: false } })).toBeTruthy();
    });

    it('should use falsy disabled input', () => {
      component.disabled = false;
      expect(component.isDisabled({ orgUnit: { active: true } })).toBeFalsy();
    });

    it('should use orgUnit.active instead of input', () => {
      component.disabled = undefined;
      expect(component.isDisabled({ orgUnit: { active: false } })).toBeTruthy();
    });

    it('should use unit.active instead of input', () => {
      component.disabled = undefined;
      expect(
        component.isDisabled({ unit: { active: false } } as any)
      ).toBeTruthy();
    });
  });

  describe('toggle inactive items', () => {
    let organizationItemService: OrganizationItemService<Budget>;

    beforeEach(() => {
      organizationItemService = TestBed.inject(OrganizationItemService);
    });

    it('should enable inactive items right away', () => {
      spyOn(organizationItemService, 'update').and.returnValue(of());
      const mockItem = { code: 'b1', active: false };
      component.toggle(mockItem);
      expect(organizationItemService.update).toHaveBeenCalledWith(
        mockItem.code,
        {
          code: 'b1',
          active: true,
        }
      );
    });

    it('should only patch code and active flag', () => {
      spyOn(organizationItemService, 'update').and.returnValue(of());
      const mockItem = { code: 'b1', active: false, foo: 'bar' };
      component.toggle(mockItem);
      expect(organizationItemService.update).toHaveBeenCalledWith(
        mockItem.code,
        {
          code: 'b1',
          active: true,
        }
      );
    });
  });

  describe('toggle active items', () => {
    let organizationItemService: OrganizationItemService<Budget>;
    let messageService: MessageService;

    beforeEach(() => {
      organizationItemService = TestBed.inject(OrganizationItemService);
      messageService = TestBed.inject(MessageService);

      spyOn(organizationItemService, 'update').and.returnValue(of());
    });

    it('should not enable active items right away', () => {
      const mockItem = { code: 'b2', active: true };
      component.toggle(mockItem);
      expect(organizationItemService.update).not.toHaveBeenCalled();
    });

    it('should prompt a confirmation message', () => {
      spyOn(messageService, 'add').and.returnValue(new Subject());
      const mockItem = { code: 'b2', active: true };
      component.toggle(mockItem);
      expect(messageService.add).toHaveBeenCalled();
      expect(organizationItemService.update).not.toHaveBeenCalled();
    });

    it('should confirm disabling', () => {
      const eventData: Subject<ConfirmationMessageData> = new Subject();
      spyOn(messageService, 'add').and.returnValue(eventData);
      const mockItem = { code: 'b2', active: true };
      component.toggle(mockItem);
      eventData.next({ confirm: true });
      expect(organizationItemService.update).toHaveBeenCalledWith(
        mockItem.code,
        {
          code: 'b2',
          active: false,
        }
      );
    });

    it('should cancel disabling', () => {
      const eventData: Subject<ConfirmationMessageData> = new Subject();
      spyOn(messageService, 'add').and.returnValue(eventData);
      const mockItem = { code: 'b2', active: true };
      component.toggle(mockItem);
      eventData.next({ close: true });
      expect(organizationItemService.update).not.toHaveBeenCalled();
    });
  });
});
