import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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
      imports: [],
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

  it('should encode malicious html code', () => {
    const template = `<span [cxJsonLd]="{foo: 'bar<script>alert(1)</script>'}">hello</span>`;
    spyOn(console, 'warn').and.stub();
    fixture = createTestComponent(template);
    fixture.detectChanges();
    expect(fixture.nativeElement.innerHTML).toContain('&lt;script&gt;');
  });

  it('should encode deep nested malicious html code', () => {
    const template = `<span [cxJsonLd]="[{ foo: { bar: { deep: 'before <script>alert()</script>and after' } }},]"></span>`;
    spyOn(console, 'warn').and.stub();
    fixture = createTestComponent(template);
    fixture.detectChanges();
    expect(fixture.nativeElement.innerHTML).toContain('&lt;script&gt;');
  });
});
