import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OutletDirective } from './outlet.directive';

const OUTLET_NAME = 'PDP.images';
const TEXT = 'standard';
@Component({
  template: `
    <ng-container *cxOutlet="'${OUTLET_NAME}'">
      <div id="debugEl">${TEXT}</div>
    </ng-container>
  `
})
class TestContainerComponent {}

describe('OutletDirective', () => {
  let fixture: ComponentFixture<TestContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [TestContainerComponent, OutletDirective]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestContainerComponent);
  });

  it('should render the provided template ref', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#debugEl').textContent).toContain(TEXT);
  });
});
