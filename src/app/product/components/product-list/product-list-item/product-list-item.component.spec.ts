import { MaterialModule } from 'app/material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListItemComponent } from './product-list-item.component';
import { PictureComponent } from '../../../../ui/components/media/picture/picture.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AddToCartComponent } from '../../../../cart/components/add-to-cart/add-to-cart.component';
import { OccCartService } from '../../../../newocc/cart/cart.service';
import { HttpModule } from '@angular/http';

fdescribe('ProductListItemComponent in product-list', () => {
  let component: ProductListItemComponent;
  let fixture: ComponentFixture<ProductListItemComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [MaterialModule, HttpModule, RouterTestingModule],
        declarations: [
          ProductListItemComponent,
          PictureComponent,
          AddToCartComponent
        ],
        providers: [OccCartService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
