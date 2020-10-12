import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { OrganizationSubListTestingModule } from 'feature-libs/my-account/organization/components/shared/organization-sub-list/organization-sub-list.testing.module';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { UnitUserListService } from '../services/unit-user-list.service';
import { UnitUserListComponent } from './unit-user-list.component';

class MockUnitUserListService {}

describe('UnitUserListComponent', () => {
  let component: UnitUserListComponent;
  let fixture: ComponentFixture<UnitUserListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        OrganizationSubListTestingModule,
        UrlTestingModule,
        I18nTestingModule,
      ],
      providers: [
        {
          provide: UnitUserListService,
          useClass: MockUnitUserListService,
        },
      ],
      declarations: [UnitUserListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UnitUserListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
