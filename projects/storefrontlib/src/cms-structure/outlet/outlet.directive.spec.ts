import { Component, ComponentFactoryResolver, Inject } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { getLastValueSync } from '@spartacus/core';
import { OutletService } from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { DeferLoaderService } from '../../layout/loading/defer-loader.service';
import { OutletRefDirective } from './outlet-ref/outlet-ref.directive';
import { OutletDirective } from './outlet.directive';
import { OutletContextData, OutletPosition } from './outlet.model';

const keptOutlet = 'keptOutlet';
const replacedOutlet = 'replacedOutlet';
class MockDeferLoaderService {
  load(_element: HTMLElement, _options?: any) {
    return of(true);
  }
}

describe('OutletDirective', () => {
  describe('(Non-stacked)', () => {
    @Component({
      template: `
        <ng-template cxOutletRef="${replacedOutlet}">
          <div id="new">replaced</div>
        </ng-template>

        <div id="kept">
          <ng-container *cxOutlet="'${keptOutlet}'">
            <div id="original">whatever</div>
          </ng-container>
        </div>

        <div id="replace">
          <ng-container *cxOutlet="'${replacedOutlet}'">
            <div id="original">whatever</div>
          </ng-container>
        </div>
      `,
    })
    class MockTemplateComponent {}

    @Component({
      template: `
        <ng-template
          cxOutletRef="before"
          cxOutletPos="${OutletPosition.BEFORE}"
        >
          <div id="new">after</div>
        </ng-template>

        <div id="before">
          <ng-container *cxOutlet="'before'">
            <div id="original">whatever</div>
          </ng-container>
        </div>
      `,
    })
    class MockOutletBeforeComponent {}

    @Component({
      template: `
        <ng-template cxOutletRef="after" cxOutletPos="${OutletPosition.AFTER}">
          <div id="new">after</div>
        </ng-template>

        <div id="after">
          <ng-container *cxOutlet="'after'">
            <div id="original">whatever</div>
          </ng-container>
        </div>
      `,
    })
    class MockOutletAfterComponent {}

    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule({
          imports: [],
          declarations: [
            MockTemplateComponent,
            MockOutletBeforeComponent,
            MockOutletAfterComponent,
            OutletDirective,
            OutletRefDirective,
          ],
          providers: [
            {
              provide: DeferLoaderService,
              useClass: MockDeferLoaderService,
            },
          ],
        }).compileComponents();
      })
    );

    it('should render the provided template ref', () => {
      const fixture = TestBed.createComponent(MockTemplateComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('#kept #original')).toBeTruthy();
    });

    it('should replace the outlet', () => {
      const fixture = TestBed.createComponent(MockTemplateComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('#replace #new')).toBeTruthy();
      expect(compiled.querySelector('#replace #original')).toBeFalsy();
    });

    it('should add before the outlet', () => {
      const fixture = TestBed.createComponent(MockOutletBeforeComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('#before #original')).toBeTruthy();
      expect(compiled.querySelector('#before #new')).toBeTruthy();
    });

    it('should add after the outlet', () => {
      const fixture = TestBed.createComponent(MockOutletAfterComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('#after #original')).toBeTruthy();
      expect(compiled.querySelector('#after #new')).toBeTruthy();
    });
  });

  describe('(stacked)', () => {
    @Component({
      template: `
        <ng-template cxOutletRef="replace">
          <div id="first">after</div>
        </ng-template>

        <ng-template cxOutletRef="replace">
          <div id="second">after</div>
        </ng-template>

        <div id="replace">
          <ng-container *cxOutlet="'replace'">
            <div id="original">whatever</div>
          </ng-container>
        </div>
      `,
    })
    class MockStackedReplaceOutletComponent {}

    @Component({
      template: `
        <ng-template
          cxOutletRef="before"
          cxOutletPos="${OutletPosition.BEFORE}"
        >
          <div id="first">after</div>
        </ng-template>

        <ng-template
          cxOutletRef="before"
          cxOutletPos="${OutletPosition.BEFORE}"
        >
          <div id="second">after</div>
        </ng-template>

        <div id="before">
          <ng-container *cxOutlet="'before'">
            <div id="original">whatever</div>
          </ng-container>
        </div>
      `,
    })
    class MockStackedBeforeOutletComponent {}

    let compiled: HTMLElement;

    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule({
          imports: [],
          declarations: [
            MockStackedReplaceOutletComponent,
            MockStackedBeforeOutletComponent,
            OutletDirective,
            OutletRefDirective,
          ],
          providers: [
            {
              provide: DeferLoaderService,
              useClass: MockDeferLoaderService,
            },
          ],
        }).compileComponents();
      })
    );

    it('should add two templates in outlet', () => {
      const fixture = TestBed.createComponent(
        MockStackedReplaceOutletComponent
      );
      fixture.detectChanges();
      compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('#replace #first')).toBeTruthy();
      expect(compiled.querySelector('#replace #second')).toBeTruthy();
      expect(compiled.querySelector('#replace #original')).toBeFalsy();
    });

    it('should add two templates before the outlet', () => {
      const fixture = TestBed.createComponent(MockStackedBeforeOutletComponent);
      fixture.detectChanges();
      compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('#before #first')).toBeTruthy();
      expect(compiled.querySelector('#before #second')).toBeTruthy();
      expect(compiled.querySelector('#before #original')).toBeTruthy();
    });
  });

  describe('defer loading', () => {
    @Component({
      template: `
        <ng-template cxOutlet="instant">
          <div id="first">instant</div>
        </ng-template>
      `,
    })
    class MockInstantOutletComponent {}

    @Component({
      template: `
        <ng-template
          cxOutlet="deferred"
          [cxOutletDefer]="{}"
          (loaded)="load($event)"
        >
          <div id="first">deferred</div>
        </ng-template>
      `,
    })
    class MockDeferredOutletComponent {
      load(_eventValue: boolean) {}
    }

    let deferLoaderService: DeferLoaderService;

    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule({
          imports: [],
          declarations: [
            MockInstantOutletComponent,
            MockDeferredOutletComponent,
            OutletDirective,
          ],
          providers: [
            {
              provide: DeferLoaderService,
              useClass: MockDeferLoaderService,
            },
          ],
        }).compileComponents();

        deferLoaderService = TestBed.inject(DeferLoaderService);
      })
    );

    it('should use instant loading', () => {
      spyOn(deferLoaderService, 'load').and.callThrough();
      const fixture = TestBed.createComponent(MockInstantOutletComponent);
      fixture.detectChanges();
      expect(deferLoaderService.load).not.toHaveBeenCalled();
    });

    it('should use defer loading', () => {
      spyOn(deferLoaderService, 'load').and.callThrough();
      const fixture = TestBed.createComponent(MockDeferredOutletComponent);
      fixture.detectChanges();
      expect(deferLoaderService.load).toHaveBeenCalled();
    });
  });

  describe('on outlet name change', () => {
    @Component({
      template: `
        <ng-template cxOutletRef="A">A</ng-template>
        <ng-template cxOutletRef="B">B</ng-template>
        <ng-container *cxOutlet="outletName"> </ng-container>
      `,
    })
    class HostComponent {
      outletName = 'A';
    }

    let hostFixture: ComponentFixture<HostComponent>;

    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule({
          imports: [],
          declarations: [HostComponent, OutletDirective, OutletRefDirective],
          providers: [
            {
              provide: DeferLoaderService,
              useClass: MockDeferLoaderService,
            },
          ],
        }).compileComponents();

        hostFixture = TestBed.createComponent(HostComponent);
      })
    );

    function getContent(fixture: ComponentFixture<any>): string {
      return fixture.debugElement.nativeElement.innerText;
    }

    it('should render template for new outlet name', () => {
      hostFixture.detectChanges();
      expect(getContent(hostFixture)).toContain('A');

      hostFixture.componentInstance.outletName = 'B';
      hostFixture.detectChanges();

      expect(getContent(hostFixture)).toContain('B');
    });
  });

  describe('ComponentFactory in outlet', () => {
    let mockContextSubject$: BehaviorSubject<string>;

    @Component({
      template: `
        <div id="kept">
          <ng-template
            [cxOutlet]="'${keptOutlet}'"
            [cxOutletContext]="mockContext$ | async"
          >
            <div id="original">whatever</div>
          </ng-template>
        </div>
      `,
    })
    class MockTemplateComponent {
      constructor(
        @Inject('mockContext') public mockContext$: Observable<string>
      ) {}
    }

    @Component({
      template: ` <div id="component">TestData</div> `,
      selector: 'cx-test-component',
    })
    class MockOutletComponent {
      constructor(public outlet: OutletContextData) {}
    }

    beforeEach(
      waitForAsync(() => {
        mockContextSubject$ = new BehaviorSubject('fakeContext');

        TestBed.configureTestingModule({
          imports: [],
          declarations: [
            MockTemplateComponent,
            MockOutletComponent,
            OutletDirective,
            OutletRefDirective,
          ],
          providers: [
            {
              provide: DeferLoaderService,
              useClass: MockDeferLoaderService,
            },
            {
              provide: 'mockContext',
              useValue: mockContextSubject$,
            },
          ],
        }).compileComponents();
      })
    );

    it('should render component', () => {
      const outletService = TestBed.inject(OutletService);
      const cfr = TestBed.inject(ComponentFactoryResolver);
      outletService.add(
        keptOutlet,
        cfr.resolveComponentFactory(MockOutletComponent)
      );
      const fixture = TestBed.createComponent(MockTemplateComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('#kept #original')).toBeFalsy();
      expect(compiled.querySelector('#kept #component')).toBeTruthy();
    });

    it('should render component BEFORE', () => {
      const outletService = TestBed.inject(OutletService);
      const cfr = TestBed.inject(ComponentFactoryResolver);
      outletService.add(
        keptOutlet,
        cfr.resolveComponentFactory(MockOutletComponent),
        OutletPosition.BEFORE
      );
      const fixture = TestBed.createComponent(MockTemplateComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('#kept #original')).toBeTruthy();
      expect(compiled.querySelector('#kept #component')).toBeTruthy();
      expect(
        compiled.querySelector('cx-test-component ~ #original')
      ).toBeTruthy();
    });

    it('should render component AFTER', () => {
      const outletService = TestBed.inject(OutletService);
      const cfr = TestBed.inject(ComponentFactoryResolver);
      outletService.add(
        keptOutlet,
        cfr.resolveComponentFactory(MockOutletComponent),
        OutletPosition.AFTER
      );
      const fixture = TestBed.createComponent(MockTemplateComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('#kept #original')).toBeTruthy();
      expect(compiled.querySelector('#kept #component')).toBeTruthy();
      expect(
        compiled.querySelector('#original ~ cx-test-component')
      ).toBeTruthy();
    });

    it('should inject OutletContextData into component', () => {
      const outletService = TestBed.inject(OutletService);
      const cfr = TestBed.inject(ComponentFactoryResolver);
      outletService.add(
        keptOutlet,
        cfr.resolveComponentFactory(MockOutletComponent)
      );
      const fixture = TestBed.createComponent(MockTemplateComponent);
      fixture.detectChanges();
      const testComponent = fixture.debugElement.query(
        By.css('cx-test-component')
      );
      const outletData: OutletContextData =
        testComponent.componentInstance.outlet;

      expect(outletData.reference).toEqual(keptOutlet);
      expect(outletData.context).toEqual('fakeContext');
      expect(getLastValueSync(outletData.context$)).toEqual('fakeContext');
      expect(outletData.position).toEqual(OutletPosition.REPLACE);
    });

    it('should emit new context to OutletContextData.context$ observable', () => {
      const outletService = TestBed.inject(OutletService);
      const cfr = TestBed.inject(ComponentFactoryResolver);
      outletService.add(
        keptOutlet,
        cfr.resolveComponentFactory(MockOutletComponent)
      );
      const fixture = TestBed.createComponent(MockTemplateComponent);
      fixture.detectChanges();
      const testComponent = fixture.debugElement.query(
        By.css('cx-test-component')
      );
      const outletData: OutletContextData =
        testComponent.componentInstance.outlet;

      expect(getLastValueSync(outletData.context$)).toEqual('fakeContext');
      mockContextSubject$.next('newFakeContext');
      fixture.detectChanges();
      expect(getLastValueSync(outletData.context$)).toEqual('newFakeContext');
    });
  });
});
