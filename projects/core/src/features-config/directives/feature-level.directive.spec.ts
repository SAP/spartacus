import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FeaturesConfig, FeaturesConfigModule } from '@spartacus/core';
import { By } from '@angular/platform-browser';

@Component({ selector: 'cx-test-cmp', template: '' })
class TestComponent {}

function createTestComponent(
  template: string
): ComponentFixture<TestComponent> {
  return TestBed.overrideComponent(TestComponent, {
    set: { template: template },
  }).createComponent(TestComponent);
}

describe('cxFeatureLevel directive', () => {
  let fixture: ComponentFixture<any>;

  afterEach(() => {
    fixture = null;
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [FeaturesConfigModule],
      providers: [
        {
          provide: FeaturesConfig,
          useValue: {
            features: { level: '1.1' },
          },
        },
      ],
    });
  });

  describe('when using string parameter', () => {
    it(
      'should show components for enabled feature level',
      waitForAsync(() => {
        const template = `<span *cxFeatureLevel="'1.1'">hello</span>`;
        fixture = createTestComponent(template);
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(1);
        expect(fixture.nativeElement.textContent).toEqual('hello');
      })
    );

    it(
      'should hide components for not enabled feature level',
      waitForAsync(() => {
        const template = `<span *cxFeatureLevel="'1.3'">hello</span>`;
        fixture = createTestComponent(template);
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(0);
        expect(fixture.nativeElement.textContent).toEqual('');
      })
    );
  });

  describe('when using number parameter', () => {
    it(
      'should show components for enabled feature level',
      waitForAsync(() => {
        const template = `<span *cxFeatureLevel="1.1">hello</span>`;
        fixture = createTestComponent(template);
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(1);
        expect(fixture.nativeElement.textContent).toEqual('hello');
      })
    );

    it(
      'should hide components for not enabled feature level',
      waitForAsync(() => {
        const template = `<span *cxFeatureLevel="1.3">hello</span>`;
        fixture = createTestComponent(template);
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(0);
        expect(fixture.nativeElement.textContent).toEqual('');
      })
    );
  });
});
