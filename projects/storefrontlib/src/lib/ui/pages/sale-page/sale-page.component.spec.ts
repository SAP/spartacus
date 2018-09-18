import { SalePageComponent } from './sale-page.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { SalePageLayoutModule } from '../../layout/sale-page-layout/sale-page-layout.module';

describe('SalePageLayoutComponent', () => {
  let component: SalePageComponent;
  let fixture: ComponentFixture<SalePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SalePageLayoutModule],
      declarations: [SalePageComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(SalePageComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
