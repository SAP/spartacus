import { TestBed, ComponentFixture, async } from '@angular/core/testing';
// import { Observable } from 'rxjs/internal/Observable';
// import { WindowRef } from '@spartacus/core';
// import { of } from 'rxjs';

import { UnitTreeNavigationUIComponent } from './unit-tree-navigation-ui.component';

import { BreakpointService } from '../../../../layout/breakpoint/breakpoint.service';
import { BREAKPOINT } from '../../../../layout/config/layout-config';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { I18nTestingModule, CmsNavigationComponent } from '@spartacus/core';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { NavigationNode } from '../../../navigation/navigation/navigation-node.model';
import { CmsComponentData } from 'projects/storefrontlib/src/cms-structure';

@Component({
    template: '',
    selector: 'cx-unit-tree-navigation-ui'
})

class MockNavigationComponent {
    @Input() node: NavigationNode;
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
            children: [
              {
                title: 'Sub child 1',
                children: [
                  {
                    title: 'Sub sub child 1',
                    url: '/sub-sub-child-1',
                  },
                  {
                    title: 'Sub sub child 1',
                    url: '/sub-sub-child-1',
                  },
                  {
                    title: 'Sub sub child 1',
                    url: '/sub-sub-child-1',
                  },
                  {
                    title: 'Sub sub child 1',
                    url: '/sub-sub-child-1',
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
    let component : UnitTreeNavigationUIComponent;
    let fixture: ComponentFixture<UnitTreeNavigationUIComponent>;
    // let breakpointService : MockBreakpointService;

    const mockCmsComponentData = <CmsNavigationComponent>{
        styleClass: 'footer-styling',
    };
    const MockCmsNavigationComponent = <CmsComponentData<any>>{
        data$: of(mockCmsComponentData),
    };
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ UnitTreeNavigationUIComponent, MockNavigationComponent ],
        imports: [I18nTestingModule],
        providers: [
            UnitTreeNavigationUIComponent,
            {
                provide: CmsComponentData,
                useValue: MockCmsNavigationComponent,
              },
          {
            provide: BreakpointService,
            useClass: MockBreakpointService
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();
    //   breakpointService = TestBed.inject(BreakpointService);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UnitTreeNavigationUIComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        component.node = mockNode;
        component.defaultExpandLevel = 1;
        component.isMobile = true;
    });

    // afterEach(() => {
    //     const subscription = new Subscription();
    //     spyOn(component, 'ngOnDestroy').and.callFake(() => {
    //         spyOn(component.subscriptions, 'unsubscribe');
    //         component.ngOnDestroy();
    //         expect(component.subscriptions.unsubscribe).toHaveBeenCalled();
    //     });
    //     fixture.destroy();
    // });

    describe('navigtion UI test', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });
    });

    // describe('mobile (md)', () => {
    //     beforeEach(() => {
    //       spyOnProperty(breakpointService, 'breakpoint$').and.returnValue(
    //         of(BREAKPOINT.md)
    //       );
    //     });

    //     it('breakpoint service should return true', () => {
    //         expect(breakpointService.isDown(BREAKPOINT.md)).toBeTruthy();
    //     });
    // });
});
