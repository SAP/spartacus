import { MaterialModule } from 'app/material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductGridItemComponent } from './product-grid-item.component';
import { PictureComponent } from '../../../../ui/components/media/picture/picture.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AddToCartComponent } from '../../../../cart/components/add-to-cart/add-to-cart.component';
import { OccCartService } from '../../../../newocc/cart/cart.service';
import { HttpModule } from '@angular/http';

fdescribe('ProductGridItemComponent in product-list', () => {
  let component: ProductGridItemComponent;
  let fixture: ComponentFixture<ProductGridItemComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [MaterialModule, HttpModule, RouterTestingModule],
        declarations: [
          ProductGridItemComponent,
          PictureComponent,
          AddToCartComponent
        ],
        providers: [OccCartService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGridItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
