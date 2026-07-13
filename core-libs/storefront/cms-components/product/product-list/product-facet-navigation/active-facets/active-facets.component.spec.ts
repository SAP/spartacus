/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  Input,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {
  Breadcrumb,
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  TranslationService,
} from '@spartacus/core';
import {
  MockFeatureTogglesController,
  provideMockFeatureToggles,
} from 'core-libs/core/src/features-config/feature-toggles/testing';
import { MockTranslationService } from 'core-libs/core/src/i18n/testing/mock-translation.service';
import { BehaviorSubject, EMPTY, of } from 'rxjs';
import { KeyboardFocusModule } from '../../../../../layout/a11y/keyboard-focus/keyboard-focus.module';
import { ICON_TYPE } from '../../../../misc/icon/icon.model';
import { FacetList } from '../facet.model';
import { FacetService } from '../services/facet.service';
import { ActiveFacetsComponent } from './active-facets.component';

@Component({
  selector: 'cx-icon',
  template: '',
  imports: [I18nTestingModule, KeyboardFocusModule],
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

const facetListSubject = new BehaviorSubject<FacetList>({
  facets: [],
  activeFacets: [],
});

class MockFacetService {
  facetList$ = facetListSubject.asObservable();
  getLinkParams() {}
}

class MockGlobalMessageService {
  add = jasmine.createSpy('add');
  remove = jasmine.createSpy('remove');
  get = jasmine.createSpy('get').and.returnValue(of({}));
}

const mockFacetList: FacetList = {
  facets: [{ name: 'facet-A' }],
  activeFacets: [{ facetName: 'facet-B' }, { facetName: 'facet-C' }],
};

describe('ActiveFacetsComponent', () => {
  let component: ActiveFacetsComponent;
  let fixture: ComponentFixture<ActiveFacetsComponent>;
  let element: DebugElement;

  beforeEach(waitForAsync(() => {
    facetListSubject.next({ facets: [], activeFacets: [] });

    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        KeyboardFocusModule,
        ActiveFacetsComponent,
        MockCxIconComponent,
        RouterModule.forRoot([]),
      ],
      providers: [
        { provide: FacetService, useClass: MockFacetService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: TranslationService, useClass: MockTranslationService },
        provideMockFeatureToggles({ a11yFilteredFacetAnnouncement: false }),
      ],
    })
      .overrideComponent(ActiveFacetsComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveFacetsComponent);
    element = fixture.debugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render h4 when there are no active facets', () => {
    component.facetList$ = EMPTY;
    fixture.detectChanges();
    const header = element.queryAll(By.css('h4'));
    expect(header.length).toBeFalsy();
  });

  it('should not render anchor links when there are no active facets', () => {
    component.facetList$ = EMPTY;
    fixture.detectChanges();
    const header = element.queryAll(By.css('a'));
    expect(header.length).toEqual(0);
  });

  it('should render h4 when there are active facets', () => {
    component.facetList$ = of(mockFacetList);
    fixture.detectChanges();
    const header = element.queryAll(By.css('h4'));
    expect(header).toBeTruthy();
  });

  it('should render an anchor links for every active facets', () => {
    component.facetList$ = of(mockFacetList);
    fixture.detectChanges();
    const header = element.queryAll(By.css('a'));
    expect(header.length).toEqual(2);
  });

  it('should return focus key when there is no matching facet', () => {
    const key = component.getFocusKey(
      { facets: [{ values: [{ name: 'anyNameButNotActive' }] }] } as FacetList,
      { facetValueName: 'activeFacet' } as Breadcrumb
    );
    expect(key).toEqual('activeFacet');
  });

  it('should not return focus key when there is a matching facet', () => {
    const key = component.getFocusKey(
      { facets: [{ values: [{ name: 'activeFacet' }] }] } as FacetList,
      { facetValueName: 'activeFacet' } as Breadcrumb
    );
    expect(key).toEqual('');
  });

  it('should remove filter on spacebar keypress', () => {
    spyOn(component, 'removeFilterWithSpacebar').and.callThrough();
    component.facetList$ = of(mockFacetList);
    fixture.detectChanges();
    const filter = element.query(By.css('a')).nativeElement;
    filter.focus();

    fixture.detectChanges();

    filter.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    fixture.detectChanges();

    expect(component.removeFilterWithSpacebar).toHaveBeenCalled();
  });

  describe('filter announcement', () => {
    let globalMessageService: MockGlobalMessageService;
    let toggles: MockFeatureTogglesController;

    beforeEach(() => {
      globalMessageService = TestBed.inject(
        GlobalMessageService
      ) as unknown as MockGlobalMessageService;
      toggles = TestBed.inject(MockFeatureTogglesController);
      facetListSubject.next({ facets: [], activeFacets: [] });
      globalMessageService.add.calls.reset();
    });

    it('should NOT announce when feature is disabled', () => {
      // toggle stays false — fixture.detectChanges() already ran in outer beforeEach
      facetListSubject.next({
        facets: [],
        activeFacets: [{ facetValueName: 'Stores' }],
      });

      expect(globalMessageService.add).not.toHaveBeenCalled();
    });

    it('should announce filter added when feature is enabled', () => {
      // Must set toggle and recreate the component so ngOnInit subscribes with toggle=true
      toggles.set('a11yFilteredFacetAnnouncement', true);
      fixture = TestBed.createComponent(ActiveFacetsComponent);
      component = fixture.componentInstance;
      facetListSubject.next({ facets: [], activeFacets: [] });
      fixture.detectChanges(); // ngOnInit runs — subscription created with toggle=true
      globalMessageService.add.calls.reset();

      facetListSubject.next({
        facets: [],
        activeFacets: [{ facetValueName: 'Stores' }],
      });

      expect(globalMessageService.add).toHaveBeenCalledTimes(1);
      const [message, type] = globalMessageService.add.calls.mostRecent().args;
      expect(type).toBe(GlobalMessageType.MSG_TYPE_ASSISTIVE);
      expect(message).toContain('filterAdded');
      expect(message).toContain('Stores');
    });

    it('should announce filter removed when feature is enabled', () => {
      toggles.set('a11yFilteredFacetAnnouncement', true);
      fixture = TestBed.createComponent(ActiveFacetsComponent);
      component = fixture.componentInstance;
      facetListSubject.next({ facets: [], activeFacets: [] });
      fixture.detectChanges();

      // Add a facet (pairwise pair: empty → one facet)
      facetListSubject.next({
        facets: [],
        activeFacets: [{ facetValueName: 'Stores' }],
      });
      globalMessageService.add.calls.reset();

      // Remove it (pairwise pair: one facet → empty)
      facetListSubject.next({ facets: [], activeFacets: [] });

      expect(globalMessageService.add).toHaveBeenCalledTimes(1);
      const [message, type] = globalMessageService.add.calls.mostRecent().args;
      expect(type).toBe(GlobalMessageType.MSG_TYPE_ASSISTIVE);
      expect(message).toContain('filterRemoved');
      expect(message).toContain('Stores');
    });

    it('should announce each removed facet when activeFacets becomes empty', () => {
      toggles.set('a11yFilteredFacetAnnouncement', true);
      fixture = TestBed.createComponent(ActiveFacetsComponent);
      component = fixture.componentInstance;
      facetListSubject.next({ facets: [], activeFacets: [] });
      fixture.detectChanges();

      // Add two facets
      facetListSubject.next({
        facets: [],
        activeFacets: [
          { facetValueName: 'Stores' },
          { facetValueName: 'Brand' },
        ],
      });
      globalMessageService.add.calls.reset();

      // Remove both at once
      facetListSubject.next({ facets: [], activeFacets: [] });

      expect(globalMessageService.add).toHaveBeenCalledTimes(2);
      globalMessageService.add.calls.all().forEach(({ args }) => {
        expect(args[1]).toBe(GlobalMessageType.MSG_TYPE_ASSISTIVE);
        expect(args[0]).toContain('filterRemoved');
      });
    });
  });
});
