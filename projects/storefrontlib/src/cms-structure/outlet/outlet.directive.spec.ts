import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DeferLoaderService } from '../../layout/loading/defer-loader.service';
import { OutletRefDirective } from './outlet-ref/outlet-ref.directive';
import { OutletDirective } from './outlet.directive';
import { OutletPosition } from './outlet.model';

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

    beforeEach(async(() => {
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
    }));

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

    beforeEach(async(() => {
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
    }));

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

    beforeEach(async(() => {
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
    }));

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
});
