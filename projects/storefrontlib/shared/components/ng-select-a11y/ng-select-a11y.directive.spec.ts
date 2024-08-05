import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { FeatureConfigService } from '@spartacus/core';
import { NgSelectA11yDirective } from './ng-select-a11y.directive';
import { NgSelectA11yModule } from './ng-select-a11y.module';

@Component({
  template: `
    <ng-select
      [searchable]="isSearchable"
      [cxNgSelectA11y]="{ ariaLabel: 'Size', ariaControls: 'size-results' }"
    >
      <ng-option *ngFor="let val of [1, 2, 3]" [value]="val">{{
        val
      }}</ng-option>
    </ng-select>
    <div id="size-results"></div>
  `,
})
class MockComponent {
  isSearchable: boolean = false;
}

class MockFeatureConfigService {
  isEnabled() {
    return true;
  }
}
describe('NgSelectA11yDirective', () => {
  let component: MockComponent;
  let fixture: ComponentFixture<MockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgSelectA11yModule, NgSelectModule],
      declarations: [MockComponent],
      providers: [
        { provide: FeatureConfigService, useClass: MockFeatureConfigService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MockComponent);

    component = fixture.componentInstance;
  });

  function getNgSelect(): DebugElement {
    return fixture.debugElement.query(By.directive(NgSelectA11yDirective));
  }

  it('should create ng-select and bind aria attributes', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();

    const select = getNgSelect().nativeElement;
    const innerDiv = select.querySelector("[role='combobox']");
    const inputElement = select.querySelector('input');

    expect(innerDiv).toBeTruthy();
    expect(innerDiv.getAttribute('aria-controls')).toEqual('size-results');
    expect(innerDiv.getAttribute('aria-label')).toEqual('Size');
    expect(inputElement.getAttribute('aria-hidden')).toEqual('true');
  });
});
