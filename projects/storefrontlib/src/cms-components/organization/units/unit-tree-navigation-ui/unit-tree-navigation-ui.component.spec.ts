import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  DebugElement,
} from '@angular/core';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UnitTreeNavigationUIComponent } from './unit-tree-navigation-ui.component';
import { BreakpointService } from '../../../../layout/breakpoint/breakpoint.service';
import { BREAKPOINT } from '../../../../layout/config/layout-config';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { I18nTestingModule } from '@spartacus/core';
import { NavigationNode } from '../../../navigation/navigation/navigation-node.model';

@Component({
  template: '',
  selector: 'cx-unit-tree-navigation-ui',
})
class MockNavigationComponent {
  @Input() node: NavigationNode;
  selectedNode: NavigationNode;
  @Input() defaultExpandLevel: number;
}

class MockBreakpointService {
  get breakpoint$(): Observable<BREAKPOINT> {
    return of();
  }
  get breakpoints(): BREAKPOINT[] {
    return [
      BREAKPOINT.xs,
      BREAKPOINT.sm,
      BREAKPOINT.md,
      BREAKPOINT.lg,
      BREAKPOINT.xl,
    ];
  }
  isDown(breakpoint: BREAKPOINT) {
    return this.breakpoint$.pipe(
      map((br) =>
        this.breakpoints
          .slice(0, this.breakpoints.indexOf(breakpoint) + 1)
          .includes(br)
      )
    );
  }
}

const mockNode: NavigationNode = {
  title: 'test',
  children: [
    {
      title: 'Root 1',
      url: '/root-1',
      children: [
        {
          title: 'Child 1',
          url: '/child-1',
          children: [
            {
              title: 'Sub child 1',
              children: [
                {
                  title: 'Sub sub child 1',
                  url: '/sub-sub-child-1',
                },
                {
                  title: 'Sub sub child 2',
                  url: '/sub-sub-child-2',
                },
                {
                  title: 'Sub sub child 3',
                  url: '/sub-sub-child-3',
                },
                {
                  title: 'Sub sub child 4',
                  url: '/sub-sub-child-4',
                },
              ],
            },
          ],
        },
        {
          title: 'Child 2',
          url: '/child-2',
        },
      ],
    },
    {
      title: 'Root 2',
      url: '/root-2',
    },
  ],
};

describe('UnitTreeNavigationUIComponent', () => {
  let component: UnitTreeNavigationUIComponent;
  let fixture: ComponentFixture<UnitTreeNavigationUIComponent>;
  let element: DebugElement;
  let breakpointService: MockBreakpointService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UnitTreeNavigationUIComponent, MockNavigationComponent],
      imports: [I18nTestingModule],
      providers: [
        UnitTreeNavigationUIComponent,
        {
          provide: BreakpointService,
          useClass: MockBreakpointService,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    breakpointService = TestBed.inject(BreakpointService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitTreeNavigationUIComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    component.node = mockNode;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('executing constructor and calling breakpoint service', async () => {
    beforeEach(() => {
      spyOnProperty(breakpointService, 'isDown').and.returnValue(
        of(BREAKPOINT.md)
      );
    });
  });

  it('should trigger refreshUIMappedElements & mapUlElementToExpand', () => {
    spyOn(component, 'mapUlElementToExpand');
    component.refreshUIWithMappedElements();
    expect(component.mapUlElementToExpand).toHaveBeenCalled();
  });

  describe('DOM UI tests', () => {
    beforeEach(() => {
      component.selectedNode = mockNode;
      fixture.detectChanges();
    });

    it('should call setTreeBranchesState on expandAll button click', () => {
      const clickMock = spyOn(component, 'setTreeBranchesState');
      element
        .queryAll(By.css('.btn-link'))[0]
        .triggerEventHandler('click', null);
      expect(clickMock).toHaveBeenCalledWith(true);
    });

    it('should call setTreeBranchesState on collapseAll button click', () => {
      const clickMock = spyOn(component, 'setTreeBranchesState');
      element
        .queryAll(By.css('.btn-link'))[1]
        .triggerEventHandler('click', null);
      expect(clickMock).toHaveBeenCalledWith(false);
    });

    it('should render node title in the DOM', () => {
      const rootElement: HTMLElement = element.queryAll(
        By.css('.node-title')
      )[0].nativeElement;
      expect(rootElement.innerText).toContain(mockNode.title);
    });

    it('should display correct node children length', () => {
      const childElement: HTMLElement = element.query(
        By.css('.node-title > span')
      ).nativeElement;
      fixture.detectChanges();
      expect(childElement.innerText).toContain(`(${mockNode.children.length})`);
    });

    describe('testing selected node tree', () => {
      const 
        nodeRootElement = mockNode.children[0],
        nodeFirstChildElement = mockNode.children[0].children[0],
        nodeSecondChildElement = mockNode.children[0].children[1],
        nodeFirstChildSubChildElement = mockNode.children[0].children[0].children[0],
        nodeFirstChildSubChildSubElement: any = mockNode.children[0].children[0].children[0].children;

      it('should return root title', () => {
        const domTree: HTMLElement = element.query(By.css('ul > li'))
          .nativeElement;
        const domElements: any = domTree.querySelectorAll('cx-generic-link');
        expect(domElements[0].getAttribute('title')).toBe(
          nodeRootElement.title
        );
      });
      it('should return root children number 1 title', () => {
        const domTree: HTMLElement = element.query(By.css('ul > li'))
          .nativeElement;
        const domElements: any = domTree.querySelectorAll('cx-generic-link');
        expect(domElements[1].getAttribute('title')).toBe(
          nodeFirstChildElement.title
        );
      });
      it('should return sub children', () => {
        const domTree: HTMLElement = element.query(By.css('ul > li'))
          .nativeElement;
        const domElements: any = domTree.querySelectorAll('cx-generic-link');
        expect(domElements[2].getAttribute('title')).toBe(
          nodeFirstChildSubChildElement.title
        );
      });

      for (const [i, node] of nodeFirstChildSubChildSubElement.entries()) {
        const childNodeElement = node.title;
        const index = i + 3;
        it(`should return ${childNodeElement}`, () => {
          const domTree: HTMLElement = element.query(By.css('ul > li'))
            .nativeElement;
          const domElements: any = domTree.querySelectorAll('cx-generic-link');
          expect(domElements[index].getAttribute('title')).toBe(childNodeElement);
        });
      }

      it('should return root children number 2 title', () => {
        const domTree: HTMLElement = element.query(By.css('ul > li'))
          .nativeElement;
        const domElements: any = domTree.querySelectorAll('cx-generic-link');
        const secondChildSubIndex = nodeFirstChildSubChildSubElement.length + 3;
        expect(domElements[secondChildSubIndex].getAttribute('title')).toBe(
          nodeSecondChildElement.title
        );
      });
    });
  });
});
