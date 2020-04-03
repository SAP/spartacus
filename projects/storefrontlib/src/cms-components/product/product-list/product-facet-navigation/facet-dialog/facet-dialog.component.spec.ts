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
import { DialogMode, FacetList } from '../facet.model';
import { FacetService } from '../services/facet.service';
import { FacetDialogComponent } from './facet-dialog.component';

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
  getFacetList() {
    return of(mockFacetList);
  }
  getState$() {
    return of();
  }
  toggleExpand() {}
}

describe('FacetDialogComponent', () => {
  let component: FacetDialogComponent;
  let fixture: ComponentFixture<FacetDialogComponent>;
  let element: DebugElement;
  let service: FacetService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, RouterTestingModule],
      declarations: [
        FacetDialogComponent,
        MockIconComponent,
        MockFacetComponent,
        MockKeyboadFocusDirective,
      ],
      providers: [{ provide: FacetService, useClass: MockFacetService }],
    })
      .overrideComponent(FacetDialogComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.inject(FacetService);
  });

  describe('with facets', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(FacetDialogComponent);
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
      expect(component.requiresDialog).toBeTruthy();
    });

    it('should not require dialog', () => {
      expect(component.requiresDialog).toBeFalsy();
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

    it('should emit load when facetList is loaded', () => {
      spyOn(component.load, 'emit').and.stub();
      component.facetList$.subscribe().unsubscribe();
      expect(component.load.emit).toHaveBeenCalled();
    });

    describe('close dialog', () => {
      it('should emit close when clicking the close button', () => {
        spyOn(component.close, 'emit').and.stub();
        component.dialogMode = DialogMode.POP;
        fixture.detectChanges();

        const header = element.query(By.css('button.close'));
        (header.nativeElement as HTMLElement).dispatchEvent(new Event('click'));
        expect(component.close.emit).toHaveBeenCalled();
      });

      it('should emit close when handling escape', () => {
        spyOn(component.close, 'emit').and.stub();
        component.dialogMode = DialogMode.POP;
        fixture.detectChanges();

        const container = element.query(By.css('div'));
        (container.nativeElement as HTMLElement).dispatchEvent(
          new Event('esc')
        );
        expect(component.close.emit).toHaveBeenCalled();
      });
    });

    describe('expanded class on cx-facet', () => {
      it('should not set expanded class when expanded state = false', () => {
        const el = element.queryAll(By.css('cx-facet'));
        const e = el[0];
        expect(e.nativeElement.classList).not.toContain('expanded');
      });

      it('should set expanded class when expanded state = true ', () => {
        spyOn(service, 'getState$').and.returnValue(of({ expanded: true }));
        fixture.detectChanges();

        const el = element.queryAll(By.css('cx-facet'));
        const e = el[0];

        expect(e.nativeElement.classList).toContain('expanded');
      });
    });
  });

  describe('without facets', () => {
    beforeEach(() => {
      spyOn(service, 'getFacetList').and.returnValue(of({ facets: [] }));

      fixture = TestBed.createComponent(FacetDialogComponent);
      element = fixture.debugElement;
      fixture.detectChanges();
    });

    it('should not render any facets', () => {
      const facets = element.queryAll(By.css('cx-facet'));
      expect(facets.length).toEqual(0);
    });
  });
});
