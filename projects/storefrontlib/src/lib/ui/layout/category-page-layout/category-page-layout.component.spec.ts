import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryPageLayoutComponent } from './category-page-layout.component';

import { Input, Component } from '@angular/core';

@Component({
  selector: 'cx-dynamic-slot',
  template: ''
})
export class MockDynamicSlotComponent {
  @Input()
  position: string;
}

describe('CategoryPageLayoutComponent', () => {
  let component: CategoryPageLayoutComponent;
  let fixture: ComponentFixture<CategoryPageLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryPageLayoutComponent, MockDynamicSlotComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryPageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
