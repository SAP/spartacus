import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductFacetNavigationComponent } from './product-facet-navigation.component';
import { NgbCollapseModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

describe('ProductFacetNavigationComponent in product-list', () => {
  let component: ProductFacetNavigationComponent;
  let fixture: ComponentFixture<ProductFacetNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgbCollapseModule, NgbModalModule],
      declarations: [ProductFacetNavigationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFacetNavigationComponent);
    component = fixture.componentInstance;

    spyOn(component.filter, 'emit').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should define query decoder', () => {
    expect(component.queryCodec).toBeDefined();
  });

  it('should toggle value', () => {
    component.toggleValue('mockQuery');
    expect(component.filter.emit).toHaveBeenCalledWith('mockQuery');
  });
});
