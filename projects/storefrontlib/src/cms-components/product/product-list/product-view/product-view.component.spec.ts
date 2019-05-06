import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { ProductViewComponent } from './product-view.component';

@Component({
  selector: 'cx-icon',
  template: '',
})
export class MockCxIconComponent {
  @Input() type;
}

describe('ProductViewComponent in product-list', () => {
  let component: ProductViewComponent;
  let fixture: ComponentFixture<ProductViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgSelectModule, FormsModule],
      declarations: [ProductViewComponent, MockCxIconComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit sort event', () => {
    spyOn(component.modeChange, 'emit');
    component.changeMode();
    expect(component.modeChange.emit).toHaveBeenCalledWith('grid');
  });
});
