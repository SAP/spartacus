import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Input, Component } from '@angular/core';

import { CategoryPageLayoutComponent } from './category-page-layout.component';

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
