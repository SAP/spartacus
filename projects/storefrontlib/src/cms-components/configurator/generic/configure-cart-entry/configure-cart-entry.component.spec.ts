import { Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  GenericConfigurator,
  I18nTestingModule,
  OrderEntry,
} from '@spartacus/core';
import { ConfigureCartEntryComponent } from './configure-cart-entry.component';
import { ModalService } from '@spartacus/storefront';

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

class MockModalService {
  closeActiveModal(): void {}
}

describe('ConfigureCartEntryComponent', () => {
  let component: ConfigureCartEntryComponent;
  let fixture: ComponentFixture<ConfigureCartEntryComponent>;
  const configuratorType = 'type';
  const orderOrCartEntry: OrderEntry = {};
  let mockModalService: MockModalService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, RouterTestingModule],
      declarations: [ConfigureCartEntryComponent, MockUrlPipe],
      providers: [
        {
          provide: ModalService,
          useClass: MockModalService,
        },
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureCartEntryComponent);
    component = fixture.componentInstance;
    spyOn(component, 'closeActiveModal').and.callThrough();
    component.cartEntry = orderOrCartEntry;
    mockModalService = TestBed.inject(ModalService);
    spyOn(mockModalService, 'closeActiveModal').and.callThrough();
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should find correct default owner type', () => {
    expect(component.getOwnerType()).toBe(
      GenericConfigurator.OwnerType.CART_ENTRY
    );
  });

  it('should find correct owner type in case entry knows order', () => {
    component.readOnly = true;
    orderOrCartEntry.orderCode = '112';
    expect(component.getOwnerType()).toBe(
      GenericConfigurator.OwnerType.ORDER_ENTRY
    );
  });

  it('should find correct entity key for cart entry', () => {
    component.cartEntry = { entryNumber: 0 };
    expect(component.getEntityKey()).toBe('0');
  });

  it('should compile correct route for cart entry', () => {
    component.cartEntry = {
      entryNumber: 0,
      product: { configuratorType: configuratorType },
    };
    expect(component.getRoute()).toBe('configure' + configuratorType);
  });

  it('should compile correct route for order entry', () => {
    component.readOnly = true;
    component.cartEntry = {
      entryNumber: 0,
      product: { configuratorType: configuratorType },
    };
    expect(component.getRoute()).toBe('configureOverview' + configuratorType);
  });

  it('should compile displayOnly method', () => {
    component.readOnly = true;
    expect(component.getDisplayOnly()).toBe(true);
  });

  describe('closeActiveModal', () => {
    it('should close active modal for readOnly-true', () => {
      component.readOnly = true;
      component.cartEntry = {
        entryNumber: 0,
        product: { configuratorType: configuratorType },
      };
      fixture.detectChanges();
      component.closeActiveModal();
      fixture.detectChanges();
      expect(component.closeActiveModal).toHaveBeenCalled();
    });

    it('should close active modal for readOnly-false', () => {
      component.readOnly = false;
      component.cartEntry = {
        entryNumber: 0,
        product: { configuratorType: configuratorType },
      };
      fixture.detectChanges();
      component.closeActiveModal();
      fixture.detectChanges();
      expect(component.closeActiveModal).toHaveBeenCalled();
    });
  });
});
