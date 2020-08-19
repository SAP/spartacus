import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { I18nTestingModule } from '@spartacus/core';
import { TableModule } from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { SplitViewTestingModule } from 'projects/storefrontlib/src/shared/components/split-view/testing/spit-view-testing.module';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';

import { UnitAddressListComponent } from './unit-address-list.component';
import { UnitAddressListService } from './unit-address-list.service';
import { CurrentUnitService } from '../../current-unit.service';

const code = 'b1';

class MockUnitAddressListService {
  getTable = function () {
    return of({});
  };
}

class MockCurrentUnitService {
  code$ = of(code);
}

xdescribe('UnitAddressListComponent', () => {
  let component: UnitAddressListComponent;
  let fixture: ComponentFixture<UnitAddressListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        I18nTestingModule,
        UrlTestingModule,
        SplitViewTestingModule,
        IconTestingModule,
        TableModule,
      ],
      declarations: [UnitAddressListComponent],
      providers: [
        {
          provide: UnitAddressListService,
          useClass: MockUnitAddressListService,
        },
        {
          provide: CurrentUnitService,
          useClass: MockCurrentUnitService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitAddressListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
