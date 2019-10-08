import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JsonLdComponent } from './json-ld.component';

const schemaMock = {
  '@context': 'http://schema.org',
  '@type': 'Product',
};

describe('JsonLdComponent', () => {
  let component: JsonLdComponent;
  let fixture: ComponentFixture<JsonLdComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [JsonLdComponent],
      providers: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonLdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create script with "application/ld+json" type', () => {
    component.schema = { any: 'thing' };
    fixture.detectChanges();

    expect(el.nativeElement.innerHTML).toContain(
      '<script type="application/ld+json">'
    );
  });

  it('should add script tag with schema json', () => {
    component.schema = schemaMock;
    fixture.detectChanges();

    expect(el.nativeElement.innerHTML).toEqual(
      '<script type="application/ld+json">{"@context":"http://schema.org","@type":"Product"}</script>'
    );
  });
});
