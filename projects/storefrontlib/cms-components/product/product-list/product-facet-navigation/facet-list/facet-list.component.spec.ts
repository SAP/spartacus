import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  Directive,
  Input,
  Renderer2,
} from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { of } from 'rxjs';
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
})
class MockIconComponent {
  @Input() type: ICON_TYPE;
}

@Component({
  selector: 'cx-facet',
  template: '',
})
class MockFacetComponent {
  @Input() facet;
}

@Directive({
  selector: '[cxFocus]',
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
    return of();
  }
  toggleExpand() {}
}

describe('FacetListComponent', () => {
  let component: FacetListComponent;
  let fixture: ComponentFixture<FacetListComponent>;
  let element: DebugElement;
  let service: FacetService;
  let renderer: Renderer2;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, RouterTestingModule],
        declarations: [
          FacetListComponent,
          MockIconComponent,
          MockFacetComponent,
          MockKeyboadFocusDirective,
        ],
        providers: [{ provide: FacetService, useClass: MockFacetService }],
      })
        .overrideComponent(FacetListComponent, {
          set: { changeDetection: ChangeDetectionStrategy.Default },
        })
        .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FacetListComponent);
    element = fixture.debugElement;
    component = fixture.componentInstance;
    component.isDialog = false;
    renderer = fixture.componentRef.injector.get<Renderer2>(Renderer2 as any);
    service = TestBed.inject(FacetService);
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

  it('should emit expandFacetGroup when handling unlock', () => {
    spyOn(component, 'expandFacetGroup').and.stub();
    component.isDialog = true;
    fixture.detectChanges();

    const container = element.queryAll(By.css('cx-facet'));
    (container[0].nativeElement as HTMLElement).dispatchEvent(
      new Event('unlock')
    );
    expect(component.expandFacetGroup).toHaveBeenCalled();
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

    it('should have collapsed class', () => {
      fixture.detectChanges();
      const el = element.queryAll(By.css('cx-facet'));
      const e = el[0];
      expect(e.nativeElement.classList).toContain('collapsed');
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

    it('should have expanded class', () => {
      fixture.detectChanges();
      const el = element.queryAll(By.css('cx-facet'));
      const e = el[0];
      expect(e.nativeElement.classList).toContain('expanded');
    });
  });
});
