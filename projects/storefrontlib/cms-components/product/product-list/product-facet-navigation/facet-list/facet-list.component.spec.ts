import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  Directive,
  Input,
  Renderer2,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FeatureConfigService, I18nTestingModule } from '@spartacus/core';
import { KeyboardFocusService } from '@spartacus/storefront';
import { TabModule } from 'projects/storefrontlib/cms-components/content/tab/tab.module';
import { MockFeatureDirective } from 'projects/storefrontlib/shared/test/mock-feature-directive';
import { EMPTY, of } from 'rxjs';
import { ICON_TYPE } from '../../../../misc/icon/icon.model';
import {
  FacetCollapseState,
  FacetGroupCollapsedState,
  FacetList,
} from '../facet.model';
import { FacetService } from '../services/facet.service';
import { FacetListComponent } from './facet-list.component';

@Component({
  selector: 'cx-icon',
  template: '',
  standalone: false,
})
class MockIconComponent {
  @Input() type: ICON_TYPE;
}

@Component({
  selector: 'cx-facet',
  template: '',
  standalone: false,
})
class MockFacetComponent {
  @Input() facet;
}

@Directive({
  selector: '[cxFocus]',
  standalone: false,
})
class MockKeyboadFocusDirective {
  @Input() cxFocus;
}

const mockFacetList: FacetList = {
  facets: [{ name: 'facet-A' }],
  activeFacets: [{ facetName: 'facet-B' }, { facetName: 'facet-C' }],
};

class MockFacetService {
  facetList$ = of(mockFacetList);

  getState() {
    return EMPTY;
  }
  toggleExpand() {}
}

describe('FacetListComponent', () => {
  let component: FacetListComponent;
  let fixture: ComponentFixture<FacetListComponent>;
  let element: DebugElement;
  let service: FacetService;
  let renderer: Renderer2;
  let focusService: KeyboardFocusService;
  let featureConfigService: FeatureConfigService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, TabModule],
      declarations: [
        FacetListComponent,
        MockIconComponent,
        MockFacetComponent,
        MockKeyboadFocusDirective,
        MockFeatureDirective,
      ],
      providers: [{ provide: FacetService, useClass: MockFacetService }],
    })
      .overrideComponent(FacetListComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacetListComponent);
    element = fixture.debugElement;
    component = fixture.componentInstance;
    component.isDialog = false;
    renderer = fixture.componentRef.injector.get<Renderer2>(Renderer2 as any);
    service = TestBed.inject(FacetService);
    focusService = TestBed.inject(KeyboardFocusService);
    featureConfigService = TestBed.inject(FeatureConfigService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should require dialog', () => {
    component.isDialog = true;
    fixture.detectChanges();
    expect(component.isDialog).toBeTruthy();
  });

  it('should not require dialog', () => {
    expect(component.isDialog).toBeFalsy();
  });

  it('should render facets', () => {
    expect(element.queryAll(By.css('cx-facet')).length).toEqual(1);
  });

  describe('dialog', () => {
    it('should add modal class to body element', () => {
      spyOn(renderer, 'addClass').and.stub();
      component.isDialog = true;
      fixture.detectChanges();

      expect(renderer.addClass).toHaveBeenCalledWith(
        jasmine.any(HTMLElement),
        'modal-open'
      );
    });

    it('should remove modal class from body element', () => {
      spyOn(renderer, 'removeClass').and.stub();
      component.close();
      fixture.detectChanges();

      expect(renderer.removeClass).toHaveBeenCalledWith(
        jasmine.any(HTMLElement),
        'modal-open'
      );
    });
  });

  describe('close dialog', () => {
    it('should emit close when clicking the close button', () => {
      spyOn(component.closeList, 'emit').and.stub();
      component.isDialog = true;
      fixture.detectChanges();

      const header = element.query(By.css('button.close'));
      (header.nativeElement as HTMLElement).dispatchEvent(new Event('click'));
      expect(component.closeList.emit).toHaveBeenCalled();
    });

    it('should emit close when handling escape', () => {
      spyOn(component.closeList, 'emit').and.stub();
      component.isDialog = true;
      fixture.detectChanges();

      const container = element.query(By.css('section'));
      (container.nativeElement as HTMLElement).dispatchEvent(new Event('esc'));
      expect(component.closeList.emit).toHaveBeenCalled();
    });
  });

  describe('collapsed', () => {
    beforeEach(() => {
      spyOn(service, 'getState').and.returnValue(
        of({
          toggled: FacetGroupCollapsedState.COLLAPSED,
        } as FacetCollapseState)
      );
    });

    it('should return true for isCollapsed()', () => {
      let result: boolean;
      component
        .isCollapsed(mockFacetList.facets[0])
        .subscribe((state) => (result = state))
        .unsubscribe();
      expect(result).toBeTruthy();
    });

    it('should return false for isExpanded()', () => {
      let result: boolean;
      component
        .isExpanded(mockFacetList.facets[0])
        .subscribe((state) => (result = state))
        .unsubscribe();
      expect(result).toBeFalsy();
    });

    it('should not have expanded class', () => {
      fixture.detectChanges();
      const el = element.queryAll(By.css('cx-facet'));
      const e = el[0];
      expect(e.nativeElement.classList).not.toContain('expanded');
    });
  });

  describe('expanded', () => {
    beforeEach(() => {
      spyOn(service, 'getState').and.returnValue(
        of({
          toggled: FacetGroupCollapsedState.EXPANDED,
        } as FacetCollapseState)
      );
    });

    it('should return false for isCollapsed()', () => {
      let result: boolean;
      component
        .isCollapsed(mockFacetList.facets[0])
        .subscribe((state) => (result = state))
        .unsubscribe();
      expect(result).toBeFalsy();
    });

    it('should return true for isExpanded()', () => {
      let result: boolean;
      component
        .isExpanded(mockFacetList.facets[0])
        .subscribe((state) => (result = state))
        .unsubscribe();
      expect(result).toBeTruthy();
    });

    it('should not have collapsed class', () => {
      fixture.detectChanges();
      const el = element.queryAll(By.css('cx-facet'));
      const e = el[0];
      expect(e.nativeElement.classList).not.toContain('collapsed');
    });
  });

  describe('handleDialogFocus', () => {
    beforeEach(() => {
      spyOn(featureConfigService, 'isEnabled').and.returnValue(true);
    });

    it('should not set focus if not a dialog', () => {
      spyOn(focusService, 'get');
      component.isDialog = false;
      (component as any).handleDialogFocus([]);
      expect(focusService.get).not.toHaveBeenCalled();
    });

    it('should not set focus if focusKey is not set', () => {
      spyOn(focusService, 'clear');
      spyOn(focusService, 'get').and.returnValue(null);
      component.isDialog = true;
      (component as any).handleDialogFocus([]);
      expect(focusService.clear).not.toHaveBeenCalled();
    });

    it('should not change focus if focused facet is found', () => {
      spyOn(focusService, 'clear');
      spyOn(focusService, 'get').and.returnValue('facet-B');
      component.isDialog = true;
      (component as any).handleDialogFocus([
        { name: 'facet-A', values: [{ name: 'facet-B' }] },
      ]);
      expect(focusService.clear).not.toHaveBeenCalled();
    });

    it('should focus on back to results button if no facets are present', () => {
      spyOn(focusService, 'clear');
      spyOn(focusService, 'get').and.returnValue('facet-B');
      component.isDialog = true;
      component.backToResultsBtn = {
        nativeElement: { focus: jasmine.createSpy('focus') },
      } as any;
      (component as any).handleDialogFocus([]);
      expect(component.backToResultsBtn.nativeElement.focus).toHaveBeenCalled();
      expect(focusService.clear).toHaveBeenCalled();
    });

    it('should set focus to the first available facet if no focused facet is found', () => {
      spyOn(focusService, 'set');
      spyOn(focusService, 'get').and.returnValue('facet-D');
      component.isDialog = true;
      (component as any).handleDialogFocus([
        { name: 'facet-A', values: [{ name: 'facet-A' }] },
      ]);
      expect(focusService.set).toHaveBeenCalledWith('facet-A');
    });
  });

  describe('enableFocusHandlingOnFacetListChanges', () => {
    it('should handle facet list focus when feature is enabled', () => {
      spyOn(<any>component, 'handleDialogFocus');
      spyOn(featureConfigService, 'isEnabled').and.returnValue(true);

      (component as any).enableFocusHandlingOnFacetListChanges();

      expect((component as any).handleDialogFocus).toHaveBeenCalled();
    });

    it('should add the subscription to the subscriptions collection', () => {
      spyOn(featureConfigService, 'isEnabled').and.returnValue(true);
      spyOn((component as any).subscriptions, 'add');
      (component as any).enableFocusHandlingOnFacetListChanges();

      expect((component as any).subscriptions.add).toHaveBeenCalled();
    });
  });

  describe('updateTabs()', () => {
    it('should update tabs on init, AfterViewInit, and facet changes', () => {
      fixture = TestBed.createComponent(FacetListComponent);
      element = fixture.debugElement;
      component = fixture.componentInstance;
      const spy = spyOn(component, 'updateTabs');
      expect(spy).toHaveBeenCalledTimes(0);
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledTimes(2);
      fixture.detectChanges();
      component.facetsRef.notifyOnChanges();
      expect(spy).toHaveBeenCalledTimes(3);
    });
  });
});
