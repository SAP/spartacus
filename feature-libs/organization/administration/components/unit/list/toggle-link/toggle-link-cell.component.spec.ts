import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  FeatureConfigService,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import { ToggleLinkCellComponent } from '@spartacus/organization/administration/components';
import { IconModule, OutletContextData } from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { Subject } from 'rxjs';
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
}

class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
}

class MockFeatureConfigService {
  isEnabled = () => true;
}

describe('ToggleLinkCellComponent', () => {
  let component: ToggleLinkCellComponent;
  let unitTreeService: UnitTreeService;
  let fixture: ComponentFixture<ToggleLinkCellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToggleLinkCellComponent],
      imports: [
        RouterTestingModule,
        UrlTestingModule,
        IconModule,
        I18nTestingModule,
      ],
      providers: [
        {
          provide: OutletContextData,
          useValue: { context: mockContext },
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
    }).compileComponents();
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

    it('should make active item the only focusable item and navigate', () => {
      Object.defineProperty(mockSpaceEvent, 'target', {
        value: mockElement1,
      });
      spyOn(mockSpaceEvent, 'preventDefault');
      spyOn(component, 'restoreFocus');

      component.onSpace(mockSpaceEvent, mockSiblingElements);

      expect(mockSpaceEvent.preventDefault).toHaveBeenCalled();
      expect(mockElement1.tabIndex).toEqual(0);
      expect(mockElement2.tabIndex).toEqual(-1);
      fixture.whenStable().then(() => {
        expect(component.restoreFocus).toHaveBeenCalled();
      });
    });

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
      spyOn(component, 'restoreFocus');

      component.onArrowRight(mockArrowRightEvent);

      expect(component.toggleItem).toHaveBeenCalledWith(mockArrowRightEvent);
      expect(component.restoreFocus).toHaveBeenCalled();
    });

    it('should collapse option on ArrowLeft', () => {
      Object.defineProperty(component, 'expanded', {
        writable: true,
        value: true,
      });
      spyOn(component, 'toggleItem');
      spyOn(component, 'restoreFocus');

      component.onArrowLeft(mockArrowLeftEvent);

      expect(component.toggleItem).toHaveBeenCalledWith(mockArrowLeftEvent);
      expect(component.restoreFocus).toHaveBeenCalled();
    });

    it('should restore focus after tree toggle', fakeAsync(() => {
      const mockElement = document.createElement('a');
      mockElement.id = 'mockElement';
      document.body.appendChild(mockElement);
      spyOnProperty(document, 'activeElement').and.returnValue(mockElement);
      const treeToggle$ = new Subject<void>();
      component['unitTreeService'] = {
        treeToggle$: treeToggle$.asObservable(),
      } as any;
      spyOn(mockElement, 'focus');

      component.restoreFocus();
      treeToggle$.next();
      tick();

      expect(mockElement.focus).toHaveBeenCalled();
    }));
  });
});
