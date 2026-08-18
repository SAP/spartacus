import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  Directive,
  Input,
  QueryList,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {
  Facet,
  FeatureConfigService,
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
} from '@spartacus/core';
import { of } from 'rxjs';
import { ICON_TYPE } from '../../../../misc/icon/icon.model';
import { FacetCollapseState } from '../facet.model';
import { FacetService } from '../services/facet.service';
import { FacetComponent } from './facet.component';
import { vi } from 'vitest';

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}
@Directive({ selector: '[cxFocus]' })
class MockKeyboadFocusDirective {
  @Input() cxFocus;
}

const MockFacetService = {
  getState: vi.fn().mockReturnValue(
    of({
      topVisible: 5,
    } as FacetCollapseState)
  ),
  toggle: vi.fn(),
  increaseVisibleValues: vi.fn(),
  decreaseVisibleValues: vi.fn(),
  getLinkParams: vi.fn(),
};

class MockGlobalMessageService {
  add = vi.fn();
  remove = vi.fn();
  get = vi.fn().mockReturnValue(of({}));
}

class MockFeatureConfigService implements Partial<FeatureConfigService> {
  isEnabled = vi.fn().mockReturnValue(false);
  isLevel = vi.fn().mockReturnValue(false);
}

const MockFacet: Facet = {
  name: 'f1',
  values: [
    {
      name: 'v1',
    },
  ],
};

describe('FacetComponent', () => {
  let component: FacetComponent;
  let fixture: ComponentFixture<FacetComponent>;
  let element: DebugElement;
  let facetService: FacetService;

  beforeEach(async () => {
    Object.values(MockFacetService).forEach(
      (fn) => typeof fn === 'function' && (fn as any).mockReset?.()
    );
    MockFacetService.getState.mockReturnValue(
      of({ topVisible: 5 } as FacetCollapseState)
    );
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        FacetComponent,
        MockCxIconComponent,
        MockKeyboadFocusDirective,
        RouterModule.forRoot([]),
      ],
      providers: [
        { provide: FacetService, useValue: MockFacetService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
      ],
    })
      .overrideComponent(FacetComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  });

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
      vi.spyOn(facetService, 'increaseVisibleValues').mockImplementation(
        () => {}
      );
      component.increaseVisibleValues();
      expect(facetService.increaseVisibleValues).toHaveBeenCalledWith(
        component.facet
      );
    });

    it('should call decreaseVisible()', () => {
      vi.spyOn(facetService, 'decreaseVisibleValues').mockImplementation(
        () => {}
      );
      component.decreaseVisibleValues();
      expect(facetService.decreaseVisibleValues).toHaveBeenCalledWith(
        component.facet
      );
    });
  });

  describe('toggleGroup', () => {
    beforeEach(() => {
      component.facet = MockFacet;
      fixture.detectChanges();
    });

    it('should expand the facet', () => {
      const spyFacetToggle = vi.spyOn(facetService, 'toggle');
      vi.spyOn(component, 'isExpanded', 'get').mockReturnValue(true);
      component.toggleGroup(new UIEvent('close'));
      fixture.detectChanges();
      expect(spyFacetToggle).toHaveBeenCalledWith(component.facet, true);
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
      vi.spyOn(component, 'toggleGroup');
      vi.spyOn(firstOptionElement, 'focus');
      vi.spyOn(secondOptionElement, 'focus');
    });

    it('should initialize keyboard controls and find tiggered values index', () => {
      vi.spyOn(component, 'onArrowDown');
      vi.spyOn(component, 'onArrowUp');

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

    it('should focus the next option', () => {
      const currentIndex = 0;
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

describe('FacetComponent with a11yFilteredFacetAnnouncement', () => {
  let component: FacetComponent;
  let fixture: ComponentFixture<FacetComponent>;
  let element: DebugElement;
  let globalMessageService: MockGlobalMessageService;

  const MockFacetWithSelectedValue: Facet = {
    name: 'f1',
    values: [
      { name: 'v1', selected: false },
      { name: 'v2', selected: true },
    ],
  };

  beforeEach(async () => {
    Object.values(MockFacetService).forEach(
      (fn) => typeof fn === 'function' && (fn as any).mockReset?.()
    );
    MockFacetService.getState.mockReturnValue(
      of({ topVisible: 5 } as FacetCollapseState)
    );
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        FacetComponent,
        MockCxIconComponent,
        MockKeyboadFocusDirective,
        RouterModule.forRoot([]),
      ],
      providers: [
        { provide: FacetService, useValue: MockFacetService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: FeatureConfigService, useClass: MockFeatureConfigService },
      ],
    })
      .overrideComponent(FacetComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    (
      TestBed.inject(FeatureConfigService).isEnabled as ReturnType<typeof vi.fn>
    ).mockImplementation((f: string) =>
      f.startsWith('!')
        ? f !== '!a11yFilteredFacetAnnouncement'
        : f === 'a11yFilteredFacetAnnouncement'
    );
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacetComponent);
    element = fixture.debugElement;
    component = fixture.componentInstance;
    globalMessageService = TestBed.inject(
      GlobalMessageService
    ) as unknown as MockGlobalMessageService;
    component.facet = MockFacetWithSelectedValue;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should announce "filterAdded" when clicking an unselected facet value', () => {
    fixture.detectChanges();
    const unselectedLink = element.queryAll(By.css('a.value'))[0].nativeElement;
    unselectedLink.click();
    expect(globalMessageService.add).toHaveBeenCalledWith(
      'productList.filterAdded filter:v1',
      GlobalMessageType.MSG_TYPE_ASSISTIVE
    );
  });

  it('should announce "filterRemoved" when clicking a selected facet value', () => {
    fixture.detectChanges();
    const selectedLink = element.queryAll(By.css('a.value'))[1].nativeElement;
    selectedLink.click();
    expect(globalMessageService.add).toHaveBeenCalledWith(
      'productList.filterRemoved filter:v2',
      GlobalMessageType.MSG_TYPE_ASSISTIVE
    );
  });
});
