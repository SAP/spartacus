import { DebugElement, Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  GenericConfigurator,
  I18nTestingModule,
  OrderEntry,
} from '@spartacus/core';
import { ModalService } from '@spartacus/storefront';
import { ConfigComponentTestUtilsService } from '../service/configurator-component-test-utils.service';
import { ConfigureCartEntryComponent } from './configure-cart-entry.component';

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

class MockModalService {
  closeActiveModal(reason?: any): void {
    console.log(reason);
  }
}

describe('ConfigureCartEntryComponent', () => {
  let component: ConfigureCartEntryComponent;
  let fixture: ComponentFixture<ConfigureCartEntryComponent>;
  let htmlElem: HTMLElement;
  let element: DebugElement;
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
    htmlElem = fixture.nativeElement;
    element = fixture.debugElement;
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

  describe('display corresponding link', () => {
    it("should display 'Display Configuration' link", () => {
      component.readOnly = true;
      component.cartEntry = {
        entryNumber: 0,
        product: { configuratorType: configuratorType },
      };
      fixture.detectChanges();
      ConfigComponentTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        'button',
        'configurator.header.displayConfiguration'
      );
    });

    it("should display 'Edit Configuration' link", () => {
      component.readOnly = false;
      component.disabled = false;
      component.msgBanner = false;
      component.cartEntry = {
        entryNumber: 0,
        product: { configuratorType: configuratorType },
      };
      fixture.detectChanges();
      ConfigComponentTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        'button',
        'configurator.header.editConfiguration'
      );
    });

    it("should display 'Resolve Issues' link", () => {
      component.readOnly = false;
      component.msgBanner = true;
      component.cartEntry = {
        entryNumber: 0,
        product: { configuratorType: configuratorType },
      };
      fixture.detectChanges();
      ConfigComponentTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        'button',
        'configurator.header.resolveIssues'
      );
    });
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
      expect(mockModalService.closeActiveModal).toHaveBeenCalledWith(
        'Display Configuration'
      );
    });

    it('should close active modal for readOnly-false and msgBanner-false', () => {
      component.readOnly = false;
      component.msgBanner = false;
      component.cartEntry = {
        entryNumber: 0,
        product: { configuratorType: configuratorType },
      };
      fixture.detectChanges();
      component.closeActiveModal();
      fixture.detectChanges();
      expect(component.closeActiveModal).toHaveBeenCalled();
      expect(mockModalService.closeActiveModal).toHaveBeenCalledWith(
        'Edit Configuration'
      );
    });

    it('should close active modal for readOnly-false and msgBanner-true', () => {
      component.readOnly = false;
      component.msgBanner = true;
      component.cartEntry = {
        entryNumber: 0,
        product: { configuratorType: configuratorType },
      };
      fixture.detectChanges();
      component.closeActiveModal();
      fixture.detectChanges();
      expect(component.closeActiveModal).toHaveBeenCalled();
      expect(mockModalService.closeActiveModal).toHaveBeenCalledWith(
        'Resolve Issues'
      );
    });
  });

  describe('Verify whether the button is enabled or disabled', () => {
    it('should be disabled', () => {
      component.disabled = true;
      component.cartEntry = {
        entryNumber: 0,
        product: { configuratorType: configuratorType },
      };
      fixture.detectChanges();
      expect(
        element.query(By.css('button.link')).nativeElement.disabled
      ).toBeTrue();
    });

    it('should be enabled', () => {
      component.disabled = false;
      component.cartEntry = {
        entryNumber: 0,
        product: { configuratorType: configuratorType },
      };
      fixture.detectChanges();
      expect(
        element.query(By.css('button.link')).nativeElement.disabled
      ).toBeFalse();
    });
  });
});
