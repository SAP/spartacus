import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Product } from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { SparePartsTabComponent } from './spare-parts-tab.component';

class MockCurrentProductService {
  getProduct(): Observable<Product> {
    return of({
      code: '1',
    });
  }
}

describe('SparePartsTabComponent', () => {
  let sparePartsTabComponent: SparePartsTabComponent;
  let fixture: ComponentFixture<SparePartsTabComponent>;
  let el: DebugElement;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [SparePartsTabComponent],
      providers: [
        {
          provide: CurrentProductService,
          useClass: MockCurrentProductService,
        },
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(SparePartsTabComponent);
    sparePartsTabComponent = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create spare parts visual picker component', () => {
    expect(sparePartsTabComponent).toBeTruthy();
  });
});
