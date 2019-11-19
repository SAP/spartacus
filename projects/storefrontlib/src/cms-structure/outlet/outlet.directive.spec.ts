import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { OutletRefDirective } from './outlet-ref/outlet-ref.directive';
import { OutletDirective } from './outlet.directive';
import { OutletPosition } from './outlet.model';

const keptOutlet = 'keptOutlet';
const replacedOutlet = 'replacedOutlet';

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
    <ng-template cxOutletRef="before" cxOutletPos="${OutletPosition.BEFORE}">
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

describe('OutletDirective', () => {
  describe('Non-stacked', () => {
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
      <ng-template cxOutletRef="before" cxOutletPos="${OutletPosition.BEFORE}">
        <div id="first">after</div>
      </ng-template>

      <ng-template cxOutletRef="before" cxOutletPos="${OutletPosition.BEFORE}">
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

  describe('Stacked', () => {
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
});
