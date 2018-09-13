import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductPagingComponent } from './product-paging.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

describe('ProductPagingComponent', () => {
  let component: ProductPagingComponent;
  let fixture: ComponentFixture<ProductPagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NgbPaginationModule.forRoot() ],
      declarations: [ProductPagingComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPagingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
