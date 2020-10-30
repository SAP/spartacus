import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { I18nTestingModule } from '@spartacus/core';
import { BehaviorSubject, of } from 'rxjs';
import { OrganizationCardTestingModule } from '../organization-card/organization-card.testing.module';
import { OrganizationItemService } from '../organization-item.service';
import { OrganizationFormComponent } from './organization-form.component';
import createSpy = jasmine.createSpy;
import { MessageService } from '@spartacus/organization/administration/components';
import { LoadStatus } from '@spartacus/organization/administration/core';

const mockItem = { foo: 'bar' };

const key$ = new BehaviorSubject('key');

class MockOrganizationItemService {
  key$ = key$.asObservable();
  current$ = of(mockItem);
  launchDetails = createSpy('launchDetails');
  unit$ = of();
  save() {
    return of({ status: LoadStatus.SUCCESS, item: mockItem });
  }
}

describe('OrganizationFormComponent', () => {
  let component: OrganizationFormComponent<any>;
  let fixture: ComponentFixture<OrganizationFormComponent<any>>;
  let organizationItemService: OrganizationItemService<any>;
  let messageService: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        I18nTestingModule,
        ReactiveFormsModule,
        OrganizationCardTestingModule,
      ],
      declarations: [OrganizationFormComponent],
      providers: [
        {
          provide: OrganizationItemService,
          useClass: MockOrganizationItemService,
        },
        MessageService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OrganizationFormComponent);
    organizationItemService = TestBed.inject(OrganizationItemService);
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
