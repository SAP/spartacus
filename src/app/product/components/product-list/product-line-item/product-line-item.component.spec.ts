import { MaterialModule } from 'app/material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductLineItemComponent } from './product-line-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AddToCartComponent } from '../../../../cms-lib/add-to-cart/add-to-cart.component';
import { CartLoaderService } from '../../../../data/cart-loader.service';
import { TokenService } from '../../../../data/token.service';
import { OccCartService } from '../../../../occ/occ-core/cart.service';
import { HttpModule } from '@angular/http';
import { ConfigService as OccConfigService } from '../../../../occ/config.service';
import { ConfigService as DataConfigService } from '../../../../data/config.service';
import { CartModelService } from '../../../../data/cart-model.service';

fdescribe('ProductLineItemComponent in product-list', () => {
  let component: ProductLineItemComponent;
  let fixture: ComponentFixture<ProductLineItemComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [MaterialModule, HttpModule, RouterTestingModule],
        declarations: [ProductLineItemComponent, AddToCartComponent],
        providers: [
          CartLoaderService,
          TokenService,
          OccConfigService,
          DataConfigService,
          OccCartService,
          CartModelService
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductLineItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
