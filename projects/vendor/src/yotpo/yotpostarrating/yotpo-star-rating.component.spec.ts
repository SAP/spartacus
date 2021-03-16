import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { Product } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { YotpoConfig } from '../yotpoconfig/yotpo-config';
import { YotpoService } from './../service/yotpo.service';
import { YotpostarratingComponent } from './yotpo-star-rating.component';

const productCode = '123456';
const mockProduct: Product = { code: productCode };

class MockYotpoService {
  getProduct(): Observable<Product> {
    return of(mockProduct);
  }
  addYotpoInitWidgetsScript() {}
}

class MockYotpoConfig extends YotpoConfig {
  vendor = {
    yotpo: {
      appToken: 'abc',
    },
  };
}

describe('YotpostarratingComponent', () => {
  let component: YotpostarratingComponent;
  let fixture: ComponentFixture<YotpostarratingComponent>;
  let service: YotpoService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [
          { provide: YotpoConfig, useClass: MockYotpoConfig },
          {
            provide: YotpoService,
            useClass: MockYotpoService,
          },
        ],
        declarations: [YotpostarratingComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(YotpostarratingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(YotpoService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch product data', () => {
    let result: Product;
    component.ngOnInit();
    component.product$.subscribe((product) => (result = product));
    expect(result).toEqual(mockProduct);
  });

  it('should add Yotpo init widgets script after view init', () => {
    spyOn(service, 'addYotpoInitWidgetsScript');
    component.ngAfterViewInit();
    expect(service.addYotpoInitWidgetsScript).toHaveBeenCalled();
  });
});
