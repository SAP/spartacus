import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import {
  CxDatePipe,
  MockDatePipe,
  MockTranslatePipe,
  TranslatePipe,
  UrlPipe,
} from '@spartacus/core';
import { MockUrlPipe } from 'core-libs/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe';
import { EMPTY } from 'rxjs';
import { ItemService, SubListComponent } from '../../../shared';
import { DisableInfoModule } from '../../../shared/detail/disable-info/disable-info.module';
import { SubListTestingModule } from '../../../shared/sub-list/sub-list.testing.module';
import { CurrentUnitService } from '../../services/current-unit.service';
import { UnitCostCenterListComponent } from './unit-cost-centers.component';
import { UnitCostCenterListService } from './unit-cost-centers.service';

class MockUnitCostCenterListService {}

class MockCurrentUnitService implements Partial<CurrentUnitService> {}

class MockItemService {
  current$ = EMPTY;
}

describe('UnitCostCenterListComponent', () => {
  let component: UnitCostCenterListComponent;
  let fixture: ComponentFixture<UnitCostCenterListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DisableInfoModule,
        UnitCostCenterListComponent,
        RouterModule.forRoot([]),
      ],
      providers: [
        {
          provide: UnitCostCenterListService,
          useClass: MockUnitCostCenterListService,
        },
        {
          provide: CurrentUnitService,
          useClass: MockCurrentUnitService,
        },
        {
          provide: ItemService,
          useClass: MockItemService,
        },
      ],
    })
      .overrideComponent(UnitCostCenterListComponent, {
        remove: {
          imports: [SubListComponent, UrlPipe, TranslatePipe, CxDatePipe],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockUrlPipe,
            MockDatePipe,
            SubListTestingModule,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(UnitCostCenterListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
