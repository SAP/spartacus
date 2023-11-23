import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
@Component({ selector: 'cx-test-cmp', template: '' })
class TestComponent {}

function createTestComponent(
  template: string
): ComponentFixture<TestComponent> {
  return TestBed.overrideComponent(TestComponent, {
    set: { template: template },
  }).createComponent(TestComponent);
}

describe('AbstractOrderDirective', () => {
  let fixture: ComponentFixture<any> | null;

  afterEach(() => {
    fixture = null;
  });
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [],
        declarations: [],
        providers: [],
      }).compileComponents();
    })
  );
});
