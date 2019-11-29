import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ConfiguratorTextfieldService,
  I18nTestingModule,
} from '@spartacus/core';
import { ConfigTextfieldAddToCartButtonComponent } from './config-textfield-add-to-cart-button.component';

class MockConfiguratorTextfieldService {
  addToCart(): void {}
}

describe('ConfigTextfieldAddToCartButtonComponent', () => {
  let classUnderTest: ConfigTextfieldAddToCartButtonComponent;
  let fixture: ComponentFixture<ConfigTextfieldAddToCartButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [ConfigTextfieldAddToCartButtonComponent],
      providers: [
        {
          provide: ConfiguratorTextfieldService,
          useClass: MockConfiguratorTextfieldService,
        },
      ],
    })
      .overrideComponent(ConfigTextfieldAddToCartButtonComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigTextfieldAddToCartButtonComponent);
    classUnderTest = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(classUnderTest).toBeTruthy();
  });
});
