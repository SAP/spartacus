import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nTestingModule } from '@spartacus/core';
import { ProductViewComponent, ViewModes } from './product-view.component';

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type;
}

describe('ProductViewComponent in product-list', () => {
  let component: ProductViewComponent;
  let fixture: ComponentFixture<ProductViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NgSelectModule, FormsModule, I18nTestingModule],
      declarations: [ProductViewComponent, MockCxIconComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    console.log('Starting ProductViewComponent in product-list test');
    fixture = TestBed.createComponent(ProductViewComponent);
    component = fixture.componentInstance;
    component.mode = ViewModes.List;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit grid (default) sort event', () => {
    spyOn(component.modeChange, 'emit');
    component.changeMode();
    expect(component.modeChange.emit).toHaveBeenCalledWith(ViewModes.Grid);
  });

  it('should emit list sort event', () => {
    component.mode = ViewModes.Grid;
    spyOn(component.modeChange, 'emit');
    component.changeMode();
    expect(component.modeChange.emit).toHaveBeenCalledWith(ViewModes.List);
  });

  it('should return default viewmode', () => {
    expect(component.viewMode).toEqual(component.iconTypes.GRID);
  });

  it('should return list viewmode', () => {
    component.mode = ViewModes.List;
    expect(component.viewMode).toEqual(component.iconTypes.GRID);
  });
});
