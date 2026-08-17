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
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {
  Breadcrumb,
  FeatureConfigService,
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
} from '@spartacus/core';
import { EMPTY, of } from 'rxjs';
import { KeyboardFocusModule } from '../../../../../layout/a11y/keyboard-focus/keyboard-focus.module';
import { ICON_TYPE } from '../../../../misc/icon/icon.model';
import { FacetList } from '../facet.model';
import { FacetService } from '../services/facet.service';
import { ActiveFacetsComponent } from './active-facets.component';
import { vi } from 'vitest';

@Component({
  selector: 'cx-icon',
  template: '',
  imports: [I18nTestingModule, KeyboardFocusModule],
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

class MockFacetService {
  facetList$ = of({ facets: [], activeFacets: [] });
  getLinkParams() {}
}

class MockGlobalMessageService {
  add = vi.fn();
  remove = vi.fn();
  get = vi.fn().mockReturnValue(of({}));
}

class MockFeatureConfigService implements Partial<FeatureConfigService> {
  isEnabled = vi.fn().mockReturnValue(false);
  isLevel = vi.fn().mockReturnValue(false);
}

const mockFacetList: FacetList = {
  facets: [{ name: 'facet-A' }],
  activeFacets: [{ facetName: 'facet-B' }, { facetName: 'facet-C' }],
};

describe('ActiveFacetsComponent', () => {
  let component: ActiveFacetsComponent;
  let fixture: ComponentFixture<ActiveFacetsComponent>;
  let element: DebugElement;

  beforeEach(async () => {
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
        { provide: FeatureConfigService, useClass: MockFeatureConfigService },
      ],
    })
      .overrideComponent(ActiveFacetsComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    (TestBed.inject(FeatureConfigService).isEnabled as ReturnType<typeof vi.fn>)
      .mockImplementation((f: string) =>
        f.startsWith('!') ? true : false
      );
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveFacetsComponent);
    element = fixture.debugElement;
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
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
    vi.spyOn(component, 'removeFilterWithSpacebar');
    component.facetList$ = of(mockFacetList);
    fixture.detectChanges();
    const filter = element.query(By.css('a')).nativeElement;
    filter.focus();

    fixture.detectChanges();

    filter.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    fixture.detectChanges();

    expect(component.removeFilterWithSpacebar).toHaveBeenCalled();
  });
});

describe('ActiveFacetsComponent with a11yFilteredFacetAnnouncement', () => {
  let component: ActiveFacetsComponent;
  let fixture: ComponentFixture<ActiveFacetsComponent>;
  let element: DebugElement;
  let globalMessageService: MockGlobalMessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
        { provide: FeatureConfigService, useClass: MockFeatureConfigService },
      ],
    })
      .overrideComponent(ActiveFacetsComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    (TestBed.inject(FeatureConfigService).isEnabled as ReturnType<typeof vi.fn>)
      .mockImplementation((f: string) =>
        f.startsWith('!') ? f !== '!a11yFilteredFacetAnnouncement' : f === 'a11yFilteredFacetAnnouncement'
      );
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveFacetsComponent);
    element = fixture.debugElement;
    component = fixture.componentInstance;
    globalMessageService = TestBed.inject(
      GlobalMessageService
    ) as unknown as MockGlobalMessageService;
    component.facetList$ = of(mockFacetList);
  });

  it('should render anchor links for every active facet', () => {
    fixture.detectChanges();
    const links = element.queryAll(By.css('a'));
    expect(links.length).toEqual(2);
  });

  it('should announce filter removal when active facet is clicked', () => {
    fixture.detectChanges();
    const link = element.query(By.css('a')).nativeElement;
    link.click();
    expect(globalMessageService.add).toHaveBeenCalledWith(
      'productList.filterRemoved filter:undefined',
      GlobalMessageType.MSG_TYPE_ASSISTIVE
    );
  });
});
