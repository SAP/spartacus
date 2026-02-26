import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {
  CxDatePipe,
  FeatureConfigService,
  I18nTestingModule,
  MockDatePipe,
  MockTranslatePipe,
  RoutingService,
  TranslatePipe,
  UrlPipe,
} from '@spartacus/core';
import { ToggleLinkCellComponent } from '@spartacus/organization/administration/components';
import { IconModule, OutletContextData } from '@spartacus/storefront';
import { MockUrlPipe } from 'projects/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe';
import { BehaviorSubject, of } from 'rxjs';
import { UnitTreeService } from '../../services/unit-tree.service';
import createSpy = jasmine.createSpy;

const mockContext = {
  expanded: true,
  depthLevel: 1,
  count: 1,
  uid: 'test',
  _field: 'name',
  _type: 'myType',
  name: 'my name',
  code: 'my code',
};

class MockUnitTreeService implements Partial<UnitTreeService> {
  toggle = createSpy('toggle');
  treeToggle$ = new BehaviorSubject(new Map());
}

class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
}

class MockFeatureConfigService {
  isEnabled() {
    return true;
  }
}

describe('ToggleLinkCellComponent', () => {
  let component: ToggleLinkCellComponent;
  let unitTreeService: UnitTreeService;
  let fixture: ComponentFixture<ToggleLinkCellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        IconModule,
        ToggleLinkCellComponent,
        I18nTestingModule,
        RouterModule.forRoot([]),
      ],
      providers: [
        {
          provide: OutletContextData,
          useValue: {
            context: mockContext,
            context$: of(mockContext),
          },
        },
        {
          provide: UnitTreeService,
          useClass: MockUnitTreeService,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: FeatureConfigService,
          useClass: MockFeatureConfigService,
        },
      ],
    })
      .overrideComponent(ToggleLinkCellComponent, {
        remove: {
          imports: [TranslatePipe, CxDatePipe, UrlPipe],
        },
        add: {
          imports: [MockTranslatePipe, MockDatePipe, MockUrlPipe],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleLinkCellComponent);
    unitTreeService = TestBed.inject(UnitTreeService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render tabindex = 0 by default', () => {
    const el: HTMLElement = fixture.debugElement.query(By.css('a')).nativeNode;
    expect(el.innerText).toEqual('my name (1)');
    expect(el.tabIndex).toEqual(0);
  });

  it('should call toggle method', () => {
    const el: HTMLElement = fixture.debugElement.query(
      By.css('button.tree-item-toggle')
    ).nativeNode;
    el.click();
    expect(unitTreeService.toggle).toHaveBeenCalledWith(mockContext);
  });

  describe('a11y', () => {
    const mockElement1 = document.createElement('a');
    const mockElement2 = document.createElement('a');
    const mockSiblingElements = [mockElement1, mockElement2];
    const mockSpaceEvent = new KeyboardEvent('keydown', { key: ' ' });
    const mockArrowDownEvent = new KeyboardEvent('keydown', {
      key: 'ArrowDown',
    });
    const mockArrowUpEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    const mockArrowRightEvent = new KeyboardEvent('keydown', {
      key: 'ArrowRight',
    });
    const mockArrowLeftEvent = new KeyboardEvent('keydown', {
      key: 'ArrowLeft',
    });

    it('should enable keyboard controls', () => {
      const mockTableElement = {
        querySelectorAll: jasmine
          .createSpy('querySelectorAll')
          .and.returnValue(mockSiblingElements),
      };
      component['elementRef'] = {
        nativeElement: {
          closest: jasmine
            .createSpy('closest')
            .and.returnValue(mockTableElement),
        },
      };
      spyOn(component, 'onSpace').and.stub();
      spyOn(component, 'onArrowDown').and.stub();
      spyOn(component, 'onArrowUp').and.stub();
      spyOn(component, 'onArrowRight').and.stub();
      spyOn(component, 'onArrowLeft').and.stub();

      component.onKeydown(mockSpaceEvent);
      expect(component.onSpace).toHaveBeenCalled();
      component.onKeydown(mockArrowDownEvent);
      expect(component.onArrowDown).toHaveBeenCalled();
      component.onKeydown(mockArrowUpEvent);
      expect(component.onArrowUp).toHaveBeenCalled();
      component.onKeydown(mockArrowRightEvent);
      expect(component.onArrowRight).toHaveBeenCalled();
      component.onKeydown(mockArrowLeftEvent);
      expect(component.onArrowLeft).toHaveBeenCalled();
    });

    it('should make active item the only focusable item and navigate', fakeAsync(() => {
      Object.defineProperty(mockSpaceEvent, 'target', {
        value: mockElement1,
      });
      spyOn(mockSpaceEvent, 'preventDefault');

      component.onSpace(mockSpaceEvent, mockSiblingElements);

      expect(mockSpaceEvent.preventDefault).toHaveBeenCalled();
      expect(mockElement1.tabIndex).toEqual(0);
      expect(mockElement2.tabIndex).toEqual(-1);
    }));

    it('should focus next link on ArrowDown', () => {
      const currentSelectedIndex = 0;
      spyOn(mockArrowDownEvent, 'preventDefault');
      spyOn(mockElement2, 'focus');

      component.onArrowDown(
        mockArrowDownEvent,
        currentSelectedIndex,
        mockSiblingElements
      );

      expect(mockArrowDownEvent.preventDefault).toHaveBeenCalled();
      expect(mockElement2.focus).toHaveBeenCalled();
    });

    it('should focus previous element on ArrowUp', () => {
      const currentSelectedIndex = 1;
      spyOn(mockArrowUpEvent, 'preventDefault');
      spyOn(mockElement1, 'focus');

      component.onArrowUp(
        mockArrowUpEvent,
        currentSelectedIndex,
        mockSiblingElements
      );

      expect(mockArrowUpEvent.preventDefault).toHaveBeenCalled();
      expect(mockElement1.focus).toHaveBeenCalled();
    });

    it('should expand option on ArrowRight', () => {
      Object.defineProperty(component, 'expanded', {
        writable: true,
        value: false,
      });
      spyOn(component, 'toggleItem');

      component.onArrowRight(mockArrowRightEvent);

      expect(component.toggleItem).toHaveBeenCalledWith(mockArrowRightEvent);
    });

    it('should collapse option on ArrowLeft', () => {
      Object.defineProperty(component, 'expanded', {
        writable: true,
        value: true,
      });
      spyOn(component, 'toggleItem');

      component.onArrowLeft(mockArrowLeftEvent);

      expect(component.toggleItem).toHaveBeenCalledWith(mockArrowLeftEvent);
    });
  });
});
