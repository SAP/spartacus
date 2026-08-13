/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfiguratorCommonsService } from '../../../../core/facade/configurator-commons.service';
import { ConfiguratorTestUtils } from '../../../../testing/configurator-test-utils';
import { ConfiguratorStorefrontUtilsService } from '../../../service/configurator-storefront-utils.service';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';
import { ConfiguratorAttributeSelectionBaseComponent } from './configurator-attribute-selection-base.component';

const isConfigurationLoading$ = new BehaviorSubject<boolean>(false);

class MockConfiguratorCommonsService {
  isConfigurationLoading(): Observable<boolean> {
    return isConfigurationLoading$.asObservable();
  }
}

@Component({
  selector: 'cx-configurator-attribute-selection',
  template: 'test-configurator-attribute-selection',
})
class ExampleConfiguratorAttributeSelectionComponent extends ConfiguratorAttributeSelectionBaseComponent {}

describe('ConfiguratorAttributeSelectionBaseComponent', () => {
  let component: ConfiguratorAttributeSelectionBaseComponent;
  let fixture: ComponentFixture<ExampleConfiguratorAttributeSelectionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        ExampleConfiguratorAttributeSelectionComponent,
      ],
      providers: [
        {
          provide: ConfiguratorAttributeCompositionContext,
          useValue: ConfiguratorTestUtils.getAttributeContext(),
        },
        {
          provide: ConfiguratorCommonsService,
          useClass: MockConfiguratorCommonsService,
        },
        {
          provide: ConfiguratorStorefrontUtilsService,
          useValue: {},
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    isConfigurationLoading$.next(false);
    fixture = TestBed.createComponent(
      ExampleConfiguratorAttributeSelectionComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('resetLoadingOnConfigurationUpdate', () => {
    it('should reset loading$ once the configuration update round trip finished, even if the attribute did not change', () => {
      component.loading$.next(true);
      expect(component.loading$.value).toBe(true);

      isConfigurationLoading$.next(false);
      expect(component.loading$.value).toBe(false);
    });

    it('should keep loading$ untouched while the configuration is still loading', () => {
      component.loading$.next(true);

      isConfigurationLoading$.next(true);
      expect(component.loading$.value).toBe(true);
    });

    it('should stop resetting loading$ after component destruction', () => {
      component.ngOnDestroy();
      component.loading$.next(true);

      isConfigurationLoading$.next(false);
      expect(component.loading$.value).toBe(true);
    });
  });
});
