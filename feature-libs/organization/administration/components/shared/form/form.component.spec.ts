import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { I18nTestingModule } from '@spartacus/core';
import { BehaviorSubject, of } from 'rxjs';
import { CardTestingModule } from '../card/card.testing.module';
import { ItemService } from '../item.service';
import { FormComponent } from './form.component';
import { MessageService } from '@spartacus/organization/administration/components';
import { LoadStatus } from '@spartacus/organization/administration/core';

const mockItem = { foo: 'bar' };

const key$ = new BehaviorSubject('key');

class MockItemService {
  key$ = key$.asObservable();
  current$ = of(mockItem);
  unit$ = of();
  save() {
    return of({ status: LoadStatus.SUCCESS, item: mockItem });
  }
  setEditMode = () => {};
  launchDetails = () => {};
}

describe('FormComponent', () => {
  let component: FormComponent<any>;
  let fixture: ComponentFixture<FormComponent<any>>;
  let organizationItemService: ItemService<any>;
  let messageService: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        I18nTestingModule,
        ReactiveFormsModule,
        CardTestingModule,
      ],
      declarations: [FormComponent],
      providers: [
        {
          provide: ItemService,
          useClass: MockItemService,
        },
        MessageService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    organizationItemService = TestBed.inject(ItemService);
    messageService = TestBed.inject(MessageService);
    component = fixture.componentInstance;
    component.i18nRoot = 'i18nRoot';
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save an updated item and notify', () => {
    const form = new FormGroup({});
    spyOn(organizationItemService, 'save').and.callThrough();
    spyOn(messageService, 'add').and.callThrough();
    spyOn(organizationItemService, 'launchDetails').and.callThrough();

    key$.next('key');
    component.save(form);

    expect(organizationItemService.save).toHaveBeenCalledWith(form, 'key');
    expect(organizationItemService.launchDetails).toHaveBeenCalled();
    expect(messageService.add).toHaveBeenCalledWith({
      message: {
        key: `i18nRoot.messages.update`,
        params: {
          item: mockItem,
        },
      },
    });
  });

  it('should save an created item and notify', () => {
    const form = new FormGroup({});
    spyOn(organizationItemService, 'save').and.callThrough();
    spyOn(messageService, 'add').and.callThrough();
    spyOn(organizationItemService, 'launchDetails').and.callThrough();

    key$.next(undefined);
    component.save(form);

    expect(organizationItemService.save).toHaveBeenCalledWith(form, undefined);
    expect(organizationItemService.launchDetails).toHaveBeenCalled();
    expect(messageService.add).toHaveBeenCalledWith({
      message: {
        key: `i18nRoot.messages.create`,
        params: {
          item: mockItem,
        },
      },
    });
  });

  describe('when loading of the created item has failed', () => {
    beforeEach(() => {
      spyOn(organizationItemService, 'save').and.returnValue(
        of({ status: LoadStatus.ERROR, item: mockItem })
      );
      spyOn(messageService, 'add').and.callThrough();
      spyOn(organizationItemService, 'launchDetails').and.callThrough();
    });

    it('should not launch details for not created item', () => {
      const form = new FormGroup({});
      key$.next(undefined);
      component.save(form);

      expect(organizationItemService.save).toHaveBeenCalledWith(
        form,
        undefined
      );
      expect(organizationItemService.launchDetails).not.toHaveBeenCalled();
    });

    it('should not notify', () => {
      expect(messageService.add).not.toHaveBeenCalled();
    });
  });

  describe('when loading of the updated item has failed', () => {
    beforeEach(() => {
      spyOn(organizationItemService, 'save').and.returnValue(
        of({ status: LoadStatus.ERROR, item: mockItem })
      );
      spyOn(messageService, 'add').and.callThrough();
      spyOn(organizationItemService, 'launchDetails').and.callThrough();
    });

    it('should not launch details for not updated item', () => {
      const form = new FormGroup({});
      key$.next('key');
      component.save(form);

      expect(organizationItemService.save).toHaveBeenCalledWith(form, 'key');
      expect(organizationItemService.launchDetails).not.toHaveBeenCalled();
    });

    it('should not notify', () => {
      expect(messageService.add).not.toHaveBeenCalled();
    });
  });
});
