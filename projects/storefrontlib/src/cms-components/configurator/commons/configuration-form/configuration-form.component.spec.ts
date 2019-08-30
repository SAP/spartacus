import { async, ComponentFixture, TestBed } from '@angular/core/testing';
 

import { ConfigurationFormComponent } from './configuration-form.component';
import { RoutingService } from '@spartacus/core';
import { RouterState } from '@angular/router';
import { Observable, of } from 'rxjs';
 
const PRODUCT_CODE = "CONF_LAPTOP";

const mockRouterState: any = {
  state:{
    params:  {
      pcCode :PRODUCT_CODE
    }
  }
};
 
class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return of(mockRouterState);
  }
}

describe('ConfigurationFormComponent', () => {
  let component: ConfigurationFormComponent;
  let fixture: ComponentFixture<ConfigurationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        ConfigurationFormComponent 
      ],
      providers: [
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationFormComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should get product code on ngOnInit()', () => {
    component.ngOnInit();
    fixture.detectChanges();
    let productCode: string;
    component.pcCode$.subscribe((data: string) => (productCode = data));
    expect(productCode).toEqual(PRODUCT_CODE);     
  });
  
 
});
