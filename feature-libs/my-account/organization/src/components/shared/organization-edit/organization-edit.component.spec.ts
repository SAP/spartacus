import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nTestingModule } from '@spartacus/core';
import { of } from 'rxjs';
import { OrganizationCardTestingModule } from '../organization-card/organization-card.testing.module';
import { OrganizationItemService } from '../organization-item.service';
import { OrganizationEditComponent } from './organization-edit.component';
import createSpy = jasmine.createSpy;

const mockItem = { foo: 'bar' };

class MockOrganizationItemService {
  key$ = of('key');
  current$ = of(mockItem);
  launchDetails = createSpy('launchDetails');
  unit$ = of();
}

describe('OrganizationEditComponent', () => {
  let component: OrganizationEditComponent<any>;
  let fixture: ComponentFixture<OrganizationEditComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        I18nTestingModule,
        ReactiveFormsModule,
        OrganizationCardTestingModule,
      ],
      declarations: [OrganizationEditComponent],
      providers: [
        {
          provide: OrganizationItemService,
          useClass: MockOrganizationItemService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationEditComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
