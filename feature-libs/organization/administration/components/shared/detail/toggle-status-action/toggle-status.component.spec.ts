import { vi } from 'vitest';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { ConfirmationMessageComponent } from '@spartacus/organization/administration/components';
import {
  Budget,
  LoadStatus,
} from '@spartacus/organization/administration/core';
import { BehaviorSubject, EMPTY, Observable, of, Subject } from 'rxjs';
import { ItemService } from '../../item.service';
import { ConfirmationMessageData } from '../../message/confirmation/confirmation-message.model';
import { MessageService } from '../../message/services/message.service';
import { ToggleStatusComponent } from './toggle-status.component';

class MockMessageService {
  add() {
    return new Subject();
  }
  close() {}
}

class MockItemService {
  current$ = EMPTY;
  isInEditMode$: Observable<boolean> = new BehaviorSubject<boolean>(false);

  update() {
    return EMPTY;
  }
}

describe('ToggleStatusComponent', () => {
  let component: ToggleStatusComponent<Budget>;
  let fixture: ComponentFixture<ToggleStatusComponent<Budget>>;
  let organizationItemService: ItemService<Budget>;
  let messageService: MessageService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, I18nTestingModule, ToggleStatusComponent],
      providers: [
        {
          provide: MessageService,
          useClass: MockMessageService,
        },
        {
          provide: ItemService,
          useClass: MockItemService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleStatusComponent);
    component = fixture.componentInstance;
    component.i18nRoot = 'testRoot';
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
    beforeEach(() => {
      organizationItemService = TestBed.inject(ItemService);
      messageService = TestBed.inject(MessageService);
    });

    it('should enable inactive items right away', () => {
      vi.spyOn(organizationItemService, 'update').mockReturnValue(EMPTY);
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
      vi.spyOn(organizationItemService, 'update').mockReturnValue(EMPTY);
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

    it('should display confirmation for enabled item', () => {
      const mockItem = { code: 'b1', active: false };
      const updatedItem = { code: 'b1', active: true };
      vi.spyOn(messageService, 'add').mockReturnValue(new Subject());
      vi.spyOn(organizationItemService, 'update').mockReturnValue(
        of({ status: LoadStatus.SUCCESS, item: updatedItem })
      );
      component.toggle(mockItem);
      expect(messageService.add).toHaveBeenCalledWith({
        message: {
          key: 'testRoot.messages.confirmEnabled',
          params: { item: updatedItem },
        },
      });
    });
  });

  describe('toggle active items', () => {
    beforeEach(() => {
      organizationItemService = TestBed.inject(ItemService);
      messageService = TestBed.inject(MessageService);

      vi.spyOn(organizationItemService, 'update').mockReturnValue(EMPTY);
    });

    it('should not enable active items right away', () => {
      const mockItem = { code: 'b2', active: true };
      component.toggle(mockItem);
      expect(organizationItemService.update).not.toHaveBeenCalled();
    });

    it('should prompt a disable confirmation prompt', () => {
      vi.spyOn(messageService, 'add').mockReturnValue(new Subject());
      const mockItem = { code: 'b2', active: true };
      component.toggle(mockItem);
      expect(messageService.add).toHaveBeenCalledWith({
        message: {
          key: 'testRoot.messages.deactivate',
          params: { item: mockItem },
        },
        messageTitle: {
          key: 'testRoot.messages.deactivateTitle',
          params: { item: mockItem },
        },
        confirm: {
          key: 'organization.confirmation.disable',
        },
        component: ConfirmationMessageComponent,
      });
      expect(organizationItemService.update).not.toHaveBeenCalled();
    });

    it('should confirm disabling', () => {
      const eventData: Subject<ConfirmationMessageData> = new Subject();
      vi.spyOn(messageService, 'add').mockReturnValue(eventData);
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

    it('should display confirmation for disabled item', () => {
      const eventData: Subject<ConfirmationMessageData> = new Subject();
      const mockItem = { code: 'b2', active: true };
      const updatedItem = { code: 'b1', active: false };
      vi.spyOn(messageService, 'add').mockReturnValue(eventData);
      organizationItemService.update = vi.fn().mockReturnValue(
        of({ status: LoadStatus.SUCCESS, item: updatedItem })
      );
      component.toggle(mockItem);
      eventData.next({ confirm: true });
      expect(messageService.add).toHaveBeenCalledWith({
        message: {
          key: 'testRoot.messages.confirmDisabled',
          params: { item: updatedItem },
        },
      });
    });

    it('should cancel disabling', () => {
      const eventData: Subject<ConfirmationMessageData> = new Subject();
      vi.spyOn(messageService, 'add').mockReturnValue(eventData);
      const mockItem = { code: 'b2', active: true };
      component.toggle(mockItem);
      eventData.next({ close: true });
      expect(organizationItemService.update).not.toHaveBeenCalled();
    });
  });
});
