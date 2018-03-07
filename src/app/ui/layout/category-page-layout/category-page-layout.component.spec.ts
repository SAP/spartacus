import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPageLayoutComponent } from './category-page-layout.component';

xdescribe('CategoryPageComponent', () => {
  let component: CategoryPageLayoutComponent;
  let fixture: ComponentFixture<CategoryPageLayoutComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [CategoryPageLayoutComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryPageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
