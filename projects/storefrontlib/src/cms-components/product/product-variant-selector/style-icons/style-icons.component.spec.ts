import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleIconsComponent } from './style-icons.component';

fdescribe('StyleIconsComponent', () => {
  let component: StyleIconsComponent;
  let fixture: ComponentFixture<StyleIconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StyleIconsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  xit('should set variantNames array', () => {
    component.ngOnInit();
    expect(Object.keys(component.variantNames).length).toBeGreaterThan(0);
  });
});
