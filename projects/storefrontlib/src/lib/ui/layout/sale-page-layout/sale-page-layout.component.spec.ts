import { SalePageLayoutComponent } from './sale-page-layout.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';

describe('SalePageLayoutComponent', () => {
  let component: SalePageLayoutComponent;
  let fixture: ComponentFixture<SalePageLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SalePageLayoutComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(SalePageLayoutComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
