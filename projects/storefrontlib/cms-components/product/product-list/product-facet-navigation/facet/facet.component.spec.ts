import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  Directive,
  Input,
  QueryList,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  Facet,
  FeatureConfigService,
  I18nTestingModule,
} from '@spartacus/core';
import { of } from 'rxjs';
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

class MockFacetService {
  getState() {
    return of({
      topVisible: 5,
    } as FacetCollapseState);
  }
  toggle() {}
  increaseVisibleValues() {}
  decreaseVisibleValues() {}
  getLinkParams() {}
}

const MockFacet: Facet = {
  name: 'f1',
  values: [
    {
      name: 'v1',
    },
  ],
};

class MockFeatureConfigService {
  isEnabled() {
    return true;
  }
}

describe('FacetComponent', () => {
  let component: FacetComponent;
  let fixture: ComponentFixture<FacetComponent>;
  let element: DebugElement;
  let facetService: FacetService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, RouterTestingModule],
        declarations: [
          FacetComponent,
          MockCxIconComponent,
          MockKeyboadFocusDirective,
        ],
        providers: [
          { provide: FacetService, useClass: MockFacetService },
          { provide: FeatureConfigService, useClass: MockFeatureConfigService },
        ],
      })
        .overrideComponent(FacetComponent, {
          set: { changeDetection: ChangeDetectionStrategy.Default },
        })
        .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FacetComponent);
    element = fixture.debugElement;
    component = fixture.componentInstance;
    facetService = TestBed.inject(FacetService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
      spyOn(facetService, 'toggle').and.stub();
      component.facet = MockFacet;
      fixture.detectChanges();
    });

    it('should expand the facet', () => {
      component.toggleGroup(new UIEvent('close'));
      fixture.detectChanges();
      expect(facetService.toggle).toHaveBeenCalledWith(component.facet, true);
    });
  });

  describe('A11y', () => {
    const firstOptionElement = document.createElement('a');
    const secondOptionElement = document.createElement('a');
    const facetHeaderElement = document.createElement('button');
    const mockArrowDownOnHeaderEvent = new KeyboardEvent('keydown', {
      key: 'ArrowDown',
    });
    const mockArrowDownOnOptionEvent = new KeyboardEvent('keydown', {
      key: 'ArrowDown',
    });
    const mockArrowUpEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    const mockArrowRightEvent = new KeyboardEvent('keydown', {
      key: 'ArrowRight',
    });
    const mockArrowLeftEvent = new KeyboardEvent('keydown', {
      key: 'ArrowLeft',
    });
    Object.defineProperty(mockArrowDownOnHeaderEvent, 'target', {
      value: facetHeaderElement,
    });
    Object.defineProperty(mockArrowDownOnOptionEvent, 'target', {
      value: secondOptionElement,
    });
    Object.defineProperty(mockArrowUpEvent, 'target', {
      value: secondOptionElement,
    });

    beforeEach(() => {
      component.values = Object.assign(new QueryList(), {
        _results: [
          { nativeElement: firstOptionElement },
          { nativeElement: secondOptionElement },
        ],
        first: { nativeElement: firstOptionElement },
        last: { nativeElement: secondOptionElement },
      });
      Object.defineProperty(component, 'isExpanded', {
        writable: true,
        value: true,
      });
      component.facetHeader = {
        nativeElement: facetHeaderElement,
      };
      spyOn(component, 'toggleGroup');
      spyOn(firstOptionElement, 'focus');
      spyOn(secondOptionElement, 'focus');
    });

    it('should initialize keyboard controls and find tiggered values index', () => {
      spyOn(component, 'onArrowLeft');
      spyOn(component, 'onArrowRight');
      spyOn(component, 'onArrowDown');
      spyOn(component, 'onArrowUp');

      component.onKeydown(mockArrowLeftEvent);
      expect(component.onArrowLeft).toHaveBeenCalledWith(mockArrowLeftEvent);

      component.onKeydown(mockArrowRightEvent);
      expect(component.onArrowRight).toHaveBeenCalledWith(mockArrowRightEvent);

      component.onKeydown(mockArrowUpEvent);
      expect(component.onArrowUp).toHaveBeenCalledWith(mockArrowUpEvent, 1);

      component.onKeydown(mockArrowDownOnHeaderEvent);
      expect(component.onArrowDown).toHaveBeenCalledWith(
        mockArrowDownOnHeaderEvent,
        -1
      );

      component.onKeydown(mockArrowDownOnOptionEvent);
      expect(component.onArrowDown).toHaveBeenCalledWith(
        mockArrowDownOnHeaderEvent,
        1
      );
    });

    it('should open facet on ArrowRight', () => {
      Object.defineProperty(component, 'isExpanded', {
        writable: true,
        value: false,
      });

      component.onArrowRight(mockArrowRightEvent);

      expect(component.toggleGroup).toHaveBeenCalled();
    });

    it('should close facet on ArrowLeft and facetHeader regains focus', () => {
      spyOn(component.facetHeader.nativeElement, 'focus');

      component.onArrowLeft(mockArrowLeftEvent);

      expect(component.toggleGroup).toHaveBeenCalled();
      expect(component.facetHeader.nativeElement.focus).toHaveBeenCalled();
    });

    it('should focus the first option on ArrowDown if triggered on facetHeader, else focus on next option', () => {
      const currentIndex = 0;

      component.onArrowDown(mockArrowDownOnHeaderEvent, currentIndex);
      expect(component.values.first.nativeElement.focus).toHaveBeenCalled();

      component.onArrowDown(mockArrowDownOnOptionEvent, currentIndex);
      expect(
        component.values.get(currentIndex + 1)?.nativeElement.focus
      ).toHaveBeenCalled();
    });

    it('should focus on the previous option on ArrowUp', () => {
      const currentIndex = 1;

      component.onArrowUp(mockArrowUpEvent, currentIndex);

      expect(
        component.values.get(currentIndex - 1)?.nativeElement.focus
      ).toHaveBeenCalled();
    });
  });
});
