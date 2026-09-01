/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {
  Address,
  B2BUnit,
  Country,
  MockTranslatePipe,
  TranslatePipe,
  UrlPipe,
  UserAddressService,
} from '@spartacus/core';
import {
  MockFeatureTogglesController,
  provideMockFeatureToggles,
} from 'core-libs/core/src/features-config/feature-toggles/testing';
import { MockUrlPipe } from 'core-libs/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe';
import { Observable, of } from 'rxjs';
import { vi } from 'vitest';
import { CardComponent } from '../../../../shared/card/card.component';
import { DeleteItemComponent } from '../../../../shared/detail/delete-item-action/delete-item.component';
import { ItemService } from '../../../../shared/item.service';
import { CurrentUnitService } from '../../../services/current-unit.service';
import { UnitAddressDetailsComponent } from './unit-address-details.component';

const mockCode = 'address-1';
const mockUnit: B2BUnit = {
  uid: 'unit-uid',
  name: 'Custom Retail',
};

const mockAddress: Address = {
  id: mockCode,
  title: 'Mr.',
  firstName: 'First',
  lastName: 'Last',
  line1: 'Buckingham Street 5',
  town: 'London',
  postalCode: 'MA8902',
  formattedAddress: 'Buckingham Street 5, London, MA8902',
  country: {
    isocode: 'US',
    name: 'United States',
  },
};

class MockItemService implements Partial<ItemService<Address>> {
  key$ = of(mockCode);
  load = vi.fn().mockReturnValue(of(mockAddress));
  error$ = of(false);
}

class MockCurrentUnitService implements Partial<CurrentUnitService> {
  item$: Observable<B2BUnit> = of(mockUnit);
}

class MockUserAddressService implements Partial<UserAddressService> {
  getDeliveryCountries(): Observable<Country[]> {
    return of([]);
  }
  loadDeliveryCountries(): void {}
}

@Component({
  selector: 'cx-org-card',
  template: '<ng-content/>',
})
class MockCardComponent {
  @Input() i18nRoot: any;
  @Input() subtitle: any;
}

@Component({
  selector: 'cx-org-delete-item',
  template: '',
})
class MockDeleteItemComponent {
  @Input() key: any;
  @Input() additionalParam: any;
  @Input() i18nRoot: any;
}

describe('UnitAddressDetailsComponent', () => {
  let component: UnitAddressDetailsComponent;
  let fixture: ComponentFixture<UnitAddressDetailsComponent>;

  const nameValueText = (): string => {
    const valueEl = fixture.debugElement.query(
      By.css('.details .property .value')
    ).nativeElement as HTMLElement;
    return valueEl.textContent?.replace(/\s+/g, ' ').trim() ?? '';
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [UnitAddressDetailsComponent, RouterModule.forRoot([])],
      providers: [
        MockFeatureTogglesController,
        ...provideMockFeatureToggles({ addTitleToAddressCard: true }),
        { provide: CurrentUnitService, useClass: MockCurrentUnitService },
        { provide: UserAddressService, useClass: MockUserAddressService },
      ],
    })
      .overrideComponent(UnitAddressDetailsComponent, {
        remove: {
          imports: [CardComponent, DeleteItemComponent, UrlPipe, TranslatePipe],
        },
        add: {
          imports: [
            MockCardComponent,
            MockDeleteItemComponent,
            MockUrlPipe,
            MockTranslatePipe,
          ],
          // Override the component-level `ItemService` provider
          // (`useExisting: UnitAddressItemService`) with a mock so the real
          // service graph (Store, RoutingService, ...) is not instantiated.
          providers: [{ provide: ItemService, useClass: MockItemService }],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(UnitAddressDetailsComponent);
    component = fixture.componentInstance;
    // Note: the first `detectChanges()` is intentionally deferred to each
    // nested `beforeEach`. The `*cxFeature` structural directive binds a
    // static feature name, so its input setter (and thus the toggle lookup)
    // runs only on the first change detection. Rendering here would lock in
    // the toggle value before each test can set it.
  });

  describe('addTitleToAddressCard feature toggle', () => {
    let toggleController: MockFeatureTogglesController;

    beforeEach(() => {
      toggleController = TestBed.inject(MockFeatureTogglesController);
    });

    describe('when addTitleToAddressCard is enabled', () => {
      beforeEach(() => {
        toggleController.set('addTitleToAddressCard', true);
        fixture.detectChanges();
      });
      it('should prepend user title before full name', () => {
        expect(component).toBeTruthy();
        expect(nameValueText()).toEqual('Mr. First Last');
      });
    });

    describe('when addTitleToAddressCard is disabled', () => {
      beforeEach(() => {
        toggleController.set('addTitleToAddressCard', false);
        fixture.detectChanges();
      });

      it('should not prepend user title before full name', () => {
        expect(component).toBeTruthy();
        expect(nameValueText()).toEqual('First Last');
      });
    });
  });
});
