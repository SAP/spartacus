import { OutletStyleService } from '../outlet-style.service';
import { Component, ElementRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StyleRefDirective } from './style-ref.directive';
import { OutletDirective } from '../outlet.directive';

const OUTLET_NAME = 'PDP.images';
const STYLE_ID = 'stylesheet';

@Component({
  selector: 'cx-test-container',
  template: `
    <link id="${STYLE_ID}" cxCssRef="${OUTLET_NAME}" />
    <ng-container *cxOutlet="'${OUTLET_NAME}'">
      <div id="debugEl"></div>
    </ng-container>
  `
})
class TestContainerComponent {}

describe('StyleOutlet', () => {
  let fixture: ComponentFixture<TestContainerComponent>;
  let service: OutletStyleService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestContainerComponent,
        StyleRefDirective,
        OutletDirective
      ],
      providers: [OutletStyleService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestContainerComponent);
    service = TestBed.get(OutletStyleService);
  });

  it('should render custom styling', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const refElement = <HTMLLinkElement>(
      compiled.querySelector('#debugEl').childNodes[0]
    );
    expect(refElement.id).toEqual(STYLE_ID);
    expect(refElement.rel).toEqual('stylesheet');
  });

  it('should have an outlet for given name', () => {
    fixture.detectChanges();
    expect(service.get(OUTLET_NAME) instanceof ElementRef).toBeTruthy();
  });
});
