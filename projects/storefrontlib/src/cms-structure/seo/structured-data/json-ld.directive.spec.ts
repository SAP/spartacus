import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturesConfigModule } from '@spartacus/core';
import { JsonLdDirective } from './json-ld.directive';

@Component({ selector: 'cx-test-cmp', template: '' })
class TestComponent {}

function createTestComponent(
  template: string
): ComponentFixture<TestComponent> {
  return TestBed.overrideComponent(TestComponent, {
    set: { template: template },
  }).createComponent(TestComponent);
}

describe('JsonLdDirective', () => {
  let fixture: ComponentFixture<any>;

  afterEach(() => {
    fixture = null;
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, JsonLdDirective],
      imports: [FeaturesConfigModule],
    });
  });

  it('should add script tag with schema json', () => {
    const template = `<span [cxJsonLd]="{foo: 'bar'}">hello</span>`;
    fixture = createTestComponent(template);
    fixture.detectChanges();
    expect(fixture.nativeElement.innerHTML).toContain(
      '<script type="application/ld+json">{"foo":"bar"}</script>'
    );
  });

  it('should not add script tag with empty schema', () => {
    const template = `<span cxJsonLd>hello</span>`;
    fixture = createTestComponent(template);
    fixture.detectChanges();
    expect(fixture.nativeElement.innerHTML).not.toContain('<script');
  });

  it('should not add script tag with null schema', () => {
    const template = `<span [cxJsonLd]="null">hello</span>`;
    fixture = createTestComponent(template);
    fixture.detectChanges();
    expect(fixture.nativeElement.innerHTML).not.toContain('<script');
  });

  // a single test for sanitization as more tests are created in the json-ld script factort
  it('should sanitize malicious code', () => {
    const template = `<span [cxJsonLd]="{foo: 'bar<script>alert(1)</script>'}">hello</span>`;
    spyOn(console, 'warn').and.stub();
    fixture = createTestComponent(template);
    fixture.detectChanges();
    expect(fixture.nativeElement.innerHTML).toContain(
      '<script type="application/ld+json">{"foo":"bar"}</script>'
    );
  });
});
