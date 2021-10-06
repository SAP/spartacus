import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { ConfirmationMessageComponent } from '@spartacus/organization/administration/components';
import {
  Budget,
  LoadStatus,
} from '@spartacus/organization/administration/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { ItemService } from '../../item.service';
import { ConfirmationMessageData } from '../../message/confirmation/confirmation-message.model';
import { MessageService } from '../../message/services/message.service';
import { DeleteItemComponent } from './delete-item.component';
import createSpy = jasmine.createSpy;

class MockMessageService {
  add() {
    return new Subject();
  }
  close() {}
}

class MockItemService {
  current$ = of();
  isInEditMode$: Observable<boolean> = new BehaviorSubject<boolean>(false);

  delete() {
    return of();
  }
}

describe('DeleteItemComponent', () => {
  let component: DeleteItemComponent<Budget>;
  let fixture: ComponentFixture<DeleteItemComponent<Budget>>;
  let organizationItemService: ItemService<Budget>;
  let messageService: MessageService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, I18nTestingModule],
      declarations: [DeleteItemComponent],

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

    fixture = TestBed.createComponent(DeleteItemComponent);
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

  describe('delete item', () => {
    beforeEach(() => {
      organizationItemService = TestBed.inject(ItemService);
      messageService = TestBed.inject(MessageService);

      spyOn(organizationItemService, 'delete').and.returnValue(of());
    });

    it('should not enable active items right away', () => {
      const mockItem = { code: 'b2', active: true };
      component.delete(mockItem);
      expect(organizationItemService.delete).not.toHaveBeenCalled();
    });

    it('should prompt a disable confirmation prompt', () => {
      spyOn(messageService, 'add').and.returnValue(new Subject());
      const mockItem = { code: 'b2', active: true };
      component.delete(mockItem);
      expect(messageService.add).toHaveBeenCalledWith({
        message: {
          key: 'testRoot.messages.delete',
          params: { item: mockItem },
        },
        messageTitle: {
          key: 'testRoot.messages.deleteTitle',
          params: { item: mockItem },
        },
        component: ConfirmationMessageComponent,
      });
      expect(organizationItemService.delete).not.toHaveBeenCalled();
    });

    it('should confirm disabling', () => {
      const eventData: Subject<ConfirmationMessageData> = new Subject();
      spyOn(messageService, 'add').and.returnValue(eventData);
      const mockItem = { code: 'b2', active: true };
      component.delete(mockItem);
      eventData.next({ confirm: true });
      expect(organizationItemService.delete).toHaveBeenCalledWith(
        mockItem.code,
        undefined
      );
    });

    it('should confirm disabling with additional param', () => {
      const eventData: Subject<ConfirmationMessageData> = new Subject();
      spyOn(messageService, 'add').and.returnValue(eventData);
      const mockItem = { code: 'b2', active: true };
      component.additionalParam = 'unitId';
      component.delete(mockItem);
      eventData.next({ confirm: true });
      expect(organizationItemService.delete).toHaveBeenCalledWith(
        mockItem.code,
        'unitId'
      );
    });

    it('should display confirmation for disabled item', () => {
      const eventData: Subject<ConfirmationMessageData> = new Subject();
      const mockItem = { code: 'b2', active: true };
      const deletedItem = { code: 'b1', active: false };
      spyOn(messageService, 'add').and.returnValue(eventData);
      organizationItemService.delete = createSpy().and.returnValue(
        of({ status: LoadStatus.SUCCESS, item: deletedItem })
      );
      component.delete(mockItem);
      eventData.next({ confirm: true });
      expect(messageService.add).toHaveBeenCalledWith({
        message: {
          key: 'testRoot.messages.deleted',
          params: { item: deletedItem },
        },
      });
    });

    it('should cancel disabling', () => {
      const eventData: Subject<ConfirmationMessageData> = new Subject();
      spyOn(messageService, 'add').and.returnValue(eventData);
      const mockItem = { code: 'b2', active: true };
      component.delete(mockItem);
      eventData.next({ close: true });
      expect(organizationItemService.delete).not.toHaveBeenCalled();
    });
  });
});
