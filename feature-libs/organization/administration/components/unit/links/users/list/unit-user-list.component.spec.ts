import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import {
  CxDatePipe,
  I18nTestingModule,
  MockDatePipe,
  MockTranslatePipe,
  TranslatePipe,
  UrlPipe,
} from '@spartacus/core';
import { B2BUserService } from '@spartacus/organization/administration/core';
import { MockUrlPipe } from 'core-libs/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe';
import { EMPTY } from 'rxjs';
import {
  DisableInfoModule,
  ItemService,
  SubListComponent,
} from '../../../../shared';
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
        DisableInfoModule,
        UnitUserListComponent,
        I18nTestingModule,
        RouterModule.forRoot([]),
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
    })
      .overrideComponent(UnitUserListComponent, {
        remove: {
          imports: [TranslatePipe, CxDatePipe, UrlPipe, SubListComponent],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockDatePipe,
            MockUrlPipe,
            SubListTestingModule,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(UnitUserListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
