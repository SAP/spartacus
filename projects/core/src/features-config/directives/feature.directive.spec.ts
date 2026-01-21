import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FeaturesConfig, FeaturesConfigModule } from '@spartacus/core';

@Component({
  selector: 'cx-test-cmp',
  template: '',
  imports: [FeaturesConfigModule],
})
class TestComponent {}

function createTestComponent(
  template: string
): ComponentFixture<TestComponent> {
  return TestBed.overrideComponent(TestComponent, {
    set: { template: template },
  }).createComponent(TestComponent);
}

describe('cxFeature directive', () => {
  let fixture: ComponentFixture<any>;

  afterEach(() => {
    fixture = null;
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FeaturesConfigModule, TestComponent],
      providers: [
        {
          provide: FeaturesConfig,
          useValue: {
            features: { testFeature: true, disabledFeature: false },
          },
        },
      ],
    });
  });

  it('should show components for enabled feature level', waitForAsync(() => {
    const template = `<span *cxFeature="'testFeature'">hello</span>`;
    fixture = createTestComponent(template);
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(1);
    expect(fixture.nativeElement.textContent).toEqual('hello');
  }));

  it('should hide components for not enabled feature level', waitForAsync(() => {
    const template = `<span *cxFeature="'disabledFeature'">hello</span>`;
    fixture = createTestComponent(template);
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(0);
    expect(fixture.nativeElement.textContent).toEqual('');
  }));
});
