import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { OrganizationSubListTestingModule } from '../../../shared/organization-sub-list/organization-sub-list.testing.module';
import { UnitUserListComponent } from './unit-user-list.component';
import { UnitUserListService } from './unit-user-list.service';

class MockUnitUserListService {}

describe('UnitUserListComponent', () => {
  let component: UnitUserListComponent;
  let fixture: ComponentFixture<UnitUserListComponent>;

  beforeEach(async(() => {
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitUserListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
