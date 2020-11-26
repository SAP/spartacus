import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { I18nTestingModule } from '@spartacus/core';
import { BehaviorSubject, of } from 'rxjs';
import { CardTestingModule } from '../card/card.testing.module';
import { ItemService } from '../item.service';
import { FormComponent } from './form.component';
import createSpy = jasmine.createSpy;
import { MessageService } from '@spartacus/organization/administration/components';
import { LoadStatus } from '@spartacus/organization/administration/core';

const mockItem = { foo: 'bar' };

const key$ = new BehaviorSubject('key');

class MockItemService {
  key$ = key$.asObservable();
  current$ = of(mockItem);
  launchDetails = createSpy('launchDetails');
  unit$ = of();
  save() {
    return of({ status: LoadStatus.SUCCESS, item: mockItem });
  }
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save an updated item and notify', () => {
    spyOn(organizationItemService, 'save').and.callThrough();
    spyOn(messageService, 'add').and.callThrough();

    key$.next('key');

    const form = new FormGroup({});
    component.save(form);

    expect(organizationItemService.save).toHaveBeenCalledWith(form, 'key');
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
    spyOn(organizationItemService, 'save').and.callThrough();
    spyOn(messageService, 'add').and.callThrough();

    key$.next(undefined);
    const form = new FormGroup({});
    component.save(form);

    expect(organizationItemService.save).toHaveBeenCalledWith(form, undefined);
    expect(messageService.add).toHaveBeenCalledWith({
      message: {
        key: `i18nRoot.messages.create`,
        params: {
          item: mockItem,
        },
      },
    });
  });
});
