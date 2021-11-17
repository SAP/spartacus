import { Component, TemplateRef } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
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
      <ng-template cxOutletRef="${OUTLET_NAME}"> ${CUSTOM_TEXT} </ng-template>
    </ng-container>

    <ng-container *ngIf="outletVisible">
      <ng-container *cxOutlet="'${OUTLET_NAME}'">
        ${STANDARD_TEXT}
      </ng-container>
    </ng-container>
  `,
})
class TestContainerComponent {
  outletRefVisible = true;
  outletVisible = true;
}

class MockDeferLoaderService {
  load(_element: HTMLElement, _options?: any) {
    return of(true);
  }
}

/**
 * Returns the innerText of the fixture
 */
function getContent(fixture: ComponentFixture<any>): string {
  return fixture.debugElement.nativeElement.innerText;
}

/**
 * Re-renders whole cxOutlet by destroying and recreating it.
 * It's needed in tests, because cxOutlet won't re-render itself after the list of declared OutletRefs change.
 */
function refreshOutlet(fixture: ComponentFixture<TestContainerComponent>) {
  fixture.componentInstance.outletVisible = false;
  fixture.detectChanges();
  fixture.componentInstance.outletVisible = true;
  fixture.detectChanges();
}

describe('OutletRefDirective', () => {
  let service: OutletService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [],
        declarations: [
          TestContainerComponent,
          OutletDirective,
          OutletRefDirective,
        ],
        providers: [
          OutletService,
          { provide: DeferLoaderService, useClass: MockDeferLoaderService },
        ],
      }).compileComponents();
    })
  );

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

    // destroy and re-define OutletRef
    fixture.componentInstance.outletRefVisible = false;
    fixture.detectChanges();
    fixture.componentInstance.outletRefVisible = true;
    fixture.detectChanges();

    refreshOutlet(fixture);

    expect(service.get(OUTLET_NAME) instanceof TemplateRef).toBeTruthy();
    expect(getContent(fixture)).toEqual(CUSTOM_TEXT);
  });
});
