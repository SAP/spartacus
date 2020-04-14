import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  Directive,
  Input,
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { of } from 'rxjs';
import { ICON_TYPE } from '../../../../misc/icon/icon.model';
import {
  DialogMode,
  FacetCollapseState,
  FacetList,
  ToggleState,
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

  beforeEach(async(() => {
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
  }));

  beforeEach(() => {
    service = TestBed.inject(FacetService);
  });

  describe('with facets', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(FacetListComponent);
      element = fixture.debugElement;
      component = fixture.componentInstance;
      component.dialogMode = DialogMode.INLINE;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should require dialog', () => {
      component.dialogMode = DialogMode.POP;
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
      component.dialogMode = DialogMode.POP;
      fixture.detectChanges();

      const container = element.queryAll(By.css('cx-facet'));
      (container[0].nativeElement as HTMLElement).dispatchEvent(
        new Event('unlock')
      );
      expect(component.expandFacetGroup).toHaveBeenCalled();
    });

    describe('close dialog', () => {
      it('should emit close when clicking the close button', () => {
        spyOn(component.closeDialog, 'emit').and.stub();
        component.dialogMode = DialogMode.POP;
        fixture.detectChanges();

        const header = element.query(By.css('button.close'));
        (header.nativeElement as HTMLElement).dispatchEvent(new Event('click'));
        expect(component.closeDialog.emit).toHaveBeenCalled();
      });

      it('should emit close when handling escape', () => {
        spyOn(component.closeDialog, 'emit').and.stub();
        component.dialogMode = DialogMode.POP;
        fixture.detectChanges();

        const container = element.query(By.css('div'));
        (container.nativeElement as HTMLElement).dispatchEvent(
          new Event('esc')
        );
        expect(component.closeDialog.emit).toHaveBeenCalled();
      });
    });

    describe('collapsed', () => {
      beforeEach(() => {
        spyOn(service, 'getState').and.returnValue(
          of({ toggled: ToggleState.COLLAPSED } as FacetCollapseState)
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
          of({ toggled: ToggleState.EXPANDED } as FacetCollapseState)
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
});
