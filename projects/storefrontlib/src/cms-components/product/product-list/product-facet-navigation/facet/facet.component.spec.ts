import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  Directive,
  Input,
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Facet, I18nTestingModule } from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import { ICON_TYPE } from '../../../../misc/icon/icon.model';
import { FacetCollapseState } from '../facet.model';
import { FacetService } from '../services/facet.service';
import { FacetComponent } from './facet.component';

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}
@Directive({
  selector: '[cxFocus]',
})
class MockKeyboadFocusDirective {
  @Input() cxFocus;
}

const s = new BehaviorSubject<FacetCollapseState>({
  expanded: true,
  expandByDefault: true,
});

class MockFacetService {
  getState() {
    return s;
  }
  toggleExpand() {}
  increaseVisibleValues() {}
  decreaseVisibleValues() {}
}

describe('FacetComponent', () => {
  let component: FacetComponent;
  let fixture: ComponentFixture<FacetComponent>;
  let element: DebugElement;
  let facetService: FacetService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, RouterTestingModule],
      declarations: [
        FacetComponent,
        MockCxIconComponent,
        MockKeyboadFocusDirective,
      ],
      providers: [{ provide: FacetService, useClass: MockFacetService }],
    })
      .overrideComponent(FacetComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacetComponent);
    element = fixture.debugElement;
    component = fixture.componentInstance;
    facetService = TestBed.inject(FacetService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('isExpanded', () => {
    it('should set isExpanded to false when expanded = false', () => {
      s.next({
        expanded: false,
      });
      component.facet = {} as Facet;
      fixture.detectChanges();
      expect(component.isExpanded).toBeFalsy();
    });

    it('should set isExpanded to true when expanded = true', () => {
      s.next({
        expanded: true,
      });
      component.facet = {} as Facet;
      fixture.detectChanges();
      expect(component.isExpanded).toBeTruthy();
    });

    it('should set isExpanded to true when expandByDefault = true', () => {
      s.next({
        expandByDefault: true,
      });
      component.facet = {} as Facet;
      fixture.detectChanges();
      expect(component.isExpanded).toBeTruthy();
    });

    it('should set isExpanded to false when expandByDefault = true but expanded = false', () => {
      s.next({
        expanded: false,
        expandByDefault: true,
      });
      component.facet = {} as Facet;
      fixture.detectChanges();
      expect(component.isExpanded).toBeFalsy();
    });

    it('should have expanded class', () => {
      component.isExpanded = true;
      fixture.detectChanges();
      const classlist = (element.nativeElement as HTMLElement).classList;
      expect(classlist).toContain('expanded');
    });

    it('should not have expanded class', () => {
      component.isExpanded = false;
      fixture.detectChanges();
      const classlist = (element.nativeElement as HTMLElement).classList;
      expect(classlist).not.toContain('expanded');
    });
  });

  describe('isMultiSelect', () => {
    it('should set multiselect to true', () => {
      component.facet = { multiSelect: true } as Facet;
      fixture.detectChanges();
      expect(component.isMultiSelect).toBeTruthy();
    });

    it('should set multiselect to false', () => {
      component.facet = { multiSelect: false } as Facet;
      fixture.detectChanges();
      expect(component.isMultiSelect).toBeFalsy();
    });

    it('should set multiselect to false by default', () => {
      fixture.detectChanges();
      expect(component.isMultiSelect).toBeFalsy();
    });

    it('should have multi-select class', () => {
      component.isMultiSelect = true;
      fixture.detectChanges();
      const classlist = (element.nativeElement as HTMLElement).classList;
      expect(classlist).toContain('multi-select');
    });

    it('should not have multi-select class', () => {
      component.isMultiSelect = false;
      fixture.detectChanges();
      const classlist = (element.nativeElement as HTMLElement).classList;
      expect(classlist).not.toContain('multi-select');
    });
  });

  describe('count', () => {
    it('should call increaseVisible()', () => {
      spyOn(facetService, 'increaseVisibleValues').and.stub();
      component.increaseVisibleValues();
      expect(facetService.increaseVisibleValues).toHaveBeenCalledWith(
        component.facet
      );
    });

    it('should call decreaseVisible()', () => {
      spyOn(facetService, 'decreaseVisibleValues').and.stub();
      component.decreaseVisibleValues();
      expect(facetService.decreaseVisibleValues).toHaveBeenCalledWith(
        component.facet
      );
    });
  });

  describe('toggleGroup', () => {
    beforeEach(() => {
      spyOn(facetService, 'toggleExpand').and.stub();
    });

    it('should expand the facet', () => {
      component.toggleGroup(new UIEvent('close'));
      fixture.detectChanges();
      expect(facetService.toggleExpand).toHaveBeenCalledWith(component.facet);
    });

    it('should force expand on a locked facet', () => {
      (element.nativeElement as HTMLElement).classList.add('is-locked');
      component.toggleGroup(new UIEvent('close'));
      fixture.detectChanges();
      expect(facetService.toggleExpand).toHaveBeenCalledWith(
        component.facet,
        true
      );
    });

    it('should not force expand on a locked facet when it is expanded already', () => {
      component.isExpanded = true;
      (element.nativeElement as HTMLElement).classList.add('is-locked');
      component.toggleGroup(new UIEvent('close'));
      fixture.detectChanges();
      expect(facetService.toggleExpand).not.toHaveBeenCalledWith(
        component.facet,
        true
      );
    });
  });
});
