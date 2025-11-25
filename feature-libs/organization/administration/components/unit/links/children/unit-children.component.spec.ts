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
import { MockUrlPipe } from 'projects/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe';
import { EMPTY } from 'rxjs';
import { ItemService, SubListComponent } from '../../../shared';
import { DisableInfoModule } from '../../../shared/detail/disable-info/disable-info.module';
import { SubListTestingModule } from '../../../shared/sub-list/sub-list.testing.module';
import { CurrentUnitService } from '../../services/current-unit.service';
import { UnitChildrenComponent } from './unit-children.component';
import { UnitChildrenService } from './unit-children.service';

class MockUnitChildrenService {}

class MockCurrentUnitService implements Partial<CurrentUnitService> {}

class MockItemService {
  current$ = EMPTY;
}

describe('UnitChildrenComponent', () => {
  let component: UnitChildrenComponent;
  let fixture: ComponentFixture<UnitChildrenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DisableInfoModule,
        UnitChildrenComponent,
        I18nTestingModule,
        RouterModule.forRoot([]),
      ],
      providers: [
        {
          provide: UnitChildrenService,
          useClass: MockUnitChildrenService,
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
      .overrideComponent(UnitChildrenComponent, {
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

    fixture = TestBed.createComponent(UnitChildrenComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
