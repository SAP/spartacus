import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nTestingModule } from '@spartacus/core';
import { of } from 'rxjs';
import { OrganizationCardTestingModule } from '../organization-card/organization-card.testing.module';
import { OrganizationItemService } from '../organization-item.service';
import { OrganizationFormComponent } from './organization-form.component';
import createSpy = jasmine.createSpy;
import { MessageService } from '@spartacus/organization/administration/components';

const mockItem = { foo: 'bar' };

class MockOrganizationItemService {
  key$ = of('key');
  current$ = of(mockItem);
  launchDetails = createSpy('launchDetails');
  unit$ = of();
}

describe('OrganizationFormComponent', () => {
  let component: OrganizationFormComponent<any>;
  let fixture: ComponentFixture<OrganizationFormComponent<any>>;

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
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
