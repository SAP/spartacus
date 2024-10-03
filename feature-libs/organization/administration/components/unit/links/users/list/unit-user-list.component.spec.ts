import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { B2BUserService } from '@spartacus/organization/administration/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { EMPTY } from 'rxjs';
import { DisableInfoModule, ItemService } from '../../../../shared';
import { SubListTestingModule } from '../../../../shared/sub-list/sub-list.testing.module';
import { CurrentUnitService } from '../../../services/current-unit.service';
import { UnitUserListService } from '../services/unit-user-list.service';
import { UnitUserListComponent } from './unit-user-list.component';

class MockUnitUserListService {}

class MockCurrentUnitService implements Partial<CurrentUnitService> {}

class MockB2BUserService implements Partial<B2BUserService> {
  isUpdatingUserAllowed(): boolean {
    return true;
  }
}

class MockItemService {
  current$ = EMPTY;
}

describe('UnitUserListComponent', () => {
  let component: UnitUserListComponent;
  let fixture: ComponentFixture<UnitUserListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SubListTestingModule,
        UrlTestingModule,
        I18nTestingModule,
        DisableInfoModule,
      ],
      providers: [
        {
          provide: UnitUserListService,
          useClass: MockUnitUserListService,
        },
        {
          provide: CurrentUnitService,
          useClass: MockCurrentUnitService,
        },
        {
          provide: B2BUserService,
          useClass: MockB2BUserService,
        },
        {
          provide: ItemService,
          useClass: MockItemService,
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
