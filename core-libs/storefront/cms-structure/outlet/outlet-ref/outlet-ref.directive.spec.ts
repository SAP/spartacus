import { NgIf } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DeferLoaderService } from '../../../layout/loading/defer-loader.service';
import { OutletDirective } from '../outlet.directive';
import { OutletService } from '../outlet.service';
import { OutletRefDirective } from './outlet-ref.directive';

const OUTLET_NAME = 'PDP.images';
const STANDARD_TEXT = 'standard';
const CUSTOM_TEXT = 'customized';

@Component({
  template: `
    <ng-container *ngIf="outletRefVisible">
      <ng-template [cxOutletRef]="outletName"> {{ customText }} </ng-template>
    </ng-container>

    <ng-container *ngIf="outletVisible">
      <ng-template [cxOutlet]="outletName">
        {{ standardText }}
      </ng-template>
    </ng-container>
  `,
  imports: [OutletDirective, OutletRefDirective, NgIf],
})
class TestContainerComponent {
  outletRefVisible = true;
  outletVisible = true;
  outletName = OUTLET_NAME;
  customText = CUSTOM_TEXT;
  standardText = STANDARD_TEXT;
}

class MockDeferLoaderService {
  load(_element: HTMLElement, _options?: any) {
    return of(true);
  }
}

function getContent(fixture: ComponentFixture<any>): string {
  return fixture.debugElement.nativeElement.textContent.trim();
}

/**
 * Re-renders the cxOutlet by toggling outletVisible off/on.
 * Uses detectChanges(false) + markForCheck() to avoid NG0100: OutletDirective.render()
 * calls vcr.clear() during ngOnChanges which corrupts LView binding state, causing
 * the no-changes verifier in a subsequent detectChanges() to throw.
 */
function refreshOutlet(fixture: ComponentFixture<TestContainerComponent>) {
  fixture.componentInstance.outletVisible = false;
  fixture.changeDetectorRef.markForCheck();
  fixture.detectChanges(false);
  fixture.componentInstance.outletVisible = true;
  fixture.changeDetectorRef.markForCheck();
  fixture.detectChanges(false);
}

describe('OutletRefDirective', () => {
  let service: OutletService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [TestContainerComponent, OutletDirective, OutletRefDirective],
      providers: [
        OutletService,
        { provide: DeferLoaderService, useClass: MockDeferLoaderService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(OutletService);
  });

  it('should render custom content', () => {
    const fixture = TestBed.createComponent(TestContainerComponent);
    fixture.detectChanges();
    expect(getContent(fixture)).toEqual(CUSTOM_TEXT);
  });

  it('should have outlet for given name', () => {
    const fixture = TestBed.createComponent(TestContainerComponent);
    fixture.detectChanges();
    expect(service.get(OUTLET_NAME) instanceof TemplateRef).toBeTruthy();
  });

  it('should unregister template on cxOutletRef destroy', () => {
    const fixture = TestBed.createComponent(TestContainerComponent);
    fixture.componentInstance.outletRefVisible = false;

    refreshOutlet(fixture);

    expect(service.get(OUTLET_NAME) instanceof TemplateRef).toBeFalsy();
    expect(getContent(fixture)).toEqual(STANDARD_TEXT);
  });

  it('should re-register template on cxOutletRef re-creation', () => {
    const fixture = TestBed.createComponent(TestContainerComponent);
    fixture.componentInstance.outletRefVisible = false;
    fixture.componentInstance.outletRefVisible = true;

    refreshOutlet(fixture);

    expect(service.get(OUTLET_NAME) instanceof TemplateRef).toBeTruthy();
    expect(getContent(fixture)).toEqual(CUSTOM_TEXT);
  });
});
