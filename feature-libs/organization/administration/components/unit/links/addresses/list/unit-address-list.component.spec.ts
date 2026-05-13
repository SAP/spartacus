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
import { SubListComponent } from '@spartacus/organization/administration/components';
import { MockUrlPipe } from 'core-libs/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe';
import { SubListTestingModule } from '../../../../shared/sub-list/sub-list.testing.module';
import { UnitAddressListComponent } from './unit-address-list.component';
import { UnitAddressListService } from './unit-address-list.service';

class MockUnitAddressListService {}

describe('UnitAddressListComponent', () => {
  let component: UnitAddressListComponent;
  let fixture: ComponentFixture<UnitAddressListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        UnitAddressListComponent,
        I18nTestingModule,
        RouterModule.forRoot([]),
      ],
      providers: [
        {
          provide: UnitAddressListService,
          useClass: MockUnitAddressListService,
        },
      ],
    })
      .overrideComponent(UnitAddressListComponent, {
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

    fixture = TestBed.createComponent(UnitAddressListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
