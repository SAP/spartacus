import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CxNgSelectModule } from './ng-select.module';
import { NgSelectDirective } from './ng-select.directive';
import { NgSelectModule } from '@ng-select/ng-select';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <ng-select cxNgSelect>
      <ng-option *ngFor="let val of [1, 2, 3]" [value]="val">{{
        val
      }}</ng-option>
    </ng-select>
  `,
})
class MockComponent {}

fdescribe('NgSelectDirective', () => {
  let component: MockComponent;
  let fixture: ComponentFixture<MockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CxNgSelectModule, NgSelectModule],
      declarations: [MockComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MockComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function getNgSelect(): DebugElement {
    return fixture.debugElement.query(By.directive(NgSelectDirective));
  }

  it('should create test ng-select with listbox and tabindex attributes', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    const select = getNgSelect().nativeElement;
    console.log(select);

    const innerDiv = select.querySelector("[role='listbox']");

    expect(innerDiv).toBeTruthy();
    expect(innerDiv.getAttribute('tabindex')).toEqual(0);
  });
});
