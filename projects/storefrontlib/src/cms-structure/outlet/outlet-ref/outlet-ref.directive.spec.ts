import { Component, TemplateRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturesConfig } from '@spartacus/core';
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
    <ng-template cxOutletRef="${OUTLET_NAME}">
      ${CUSTOM_TEXT}
    </ng-template>
    <ng-container *cxOutlet="'${OUTLET_NAME}'">
      ${STANDARD_TEXT}
    </ng-container>
  `,
})
class TestContainerComponent {}

@Component({
  template: `
    <ng-container *ngIf="!destroyed">
      <ng-template cxOutletRef="${OUTLET_NAME}">
        ${CUSTOM_TEXT}
      </ng-template>

      <ng-container *cxOutlet="'${OUTLET_NAME}'"></ng-container>
    </ng-container>
  `,
})
class TestTogglingComponent {
  destroyed = false;
}

class MockDeferLoaderService {
  load(_element: HTMLElement, _options?: any) {
    return of(true);
  }
}

function getContent(fixture: ComponentFixture<any>): string {
  return fixture.debugElement.nativeElement.innerText;
}

describe('OutletRefDirective', () => {
  let service: OutletService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        TestContainerComponent,
        TestTogglingComponent,
        OutletDirective,
        OutletRefDirective,
      ],
      providers: [
        OutletService,
        { provide: DeferLoaderService, useClass: MockDeferLoaderService },
        {
          provide: FeaturesConfig,
          useValue: { features: { level: '2.1' } } as FeaturesConfig, // deprecated, see #
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.inject(OutletService);
  });

  it('should render custom content', () => {
    const fixture = TestBed.createComponent(TestContainerComponent);
    fixture.detectChanges();
    expect(getContent(fixture)).toContain(CUSTOM_TEXT);
  });

  it('should have outlet for given name', () => {
    const fixture = TestBed.createComponent(TestContainerComponent);
    fixture.detectChanges();
    expect(service.get(OUTLET_NAME) instanceof TemplateRef).toBeTruthy();
  });

  it('should unregister template on directive destroy', () => {
    const fixture = TestBed.createComponent(TestTogglingComponent);
    fixture.componentInstance.destroyed = true;
    fixture.detectChanges();

    expect(service.get(OUTLET_NAME) instanceof TemplateRef).toBeFalsy();
    expect(getContent(fixture)).toEqual('');
  });

  it('should re-register template on directive re-creation', () => {
    const fixture = TestBed.createComponent(TestTogglingComponent);
    fixture.componentInstance.destroyed = true;
    fixture.detectChanges();
    fixture.componentInstance.destroyed = false;
    fixture.detectChanges();

    expect(service.get(OUTLET_NAME) instanceof TemplateRef).toBeTruthy();
    expect(getContent(fixture)).toEqual(CUSTOM_TEXT);
  });
});
