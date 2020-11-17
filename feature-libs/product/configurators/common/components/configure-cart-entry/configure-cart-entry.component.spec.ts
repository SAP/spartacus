import {
  DebugElement,
  Directive,
  Input,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, OrderEntry } from '@spartacus/core';
import { ModalDirective } from '@spartacus/storefront';
import { CommonConfigurator } from '../../core/model/common-configurator.model';
import { CommonConfiguratorTestUtilsService } from '../../shared/testing/common-configurator-test-utils.service';
import { ConfigureCartEntryComponent } from './configure-cart-entry.component';

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

@Directive({
  selector: '[cxModal]',
})
class MockModalDirective implements Partial<ModalDirective> {
  @Input() cxModal;
}

describe('ConfigureCartEntryComponent', () => {
  let component: ConfigureCartEntryComponent;
  let fixture: ComponentFixture<ConfigureCartEntryComponent>;
  let htmlElem: HTMLElement;
  let element: DebugElement;
  const configuratorType = 'type';
  const orderOrCartEntry: OrderEntry = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, RouterTestingModule],
      declarations: [
        ConfigureCartEntryComponent,
        MockUrlPipe,
        MockModalDirective,
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureCartEntryComponent);
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
    element = fixture.debugElement;
    component.cartEntry = orderOrCartEntry;
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should find correct default owner type', () => {
    orderOrCartEntry.orderCode = undefined;
    expect(component.getOwnerType()).toBe(
      CommonConfigurator.OwnerType.CART_ENTRY
    );
  });

  it('should find correct owner type in case entry knows order', () => {
    component.readOnly = true;
    orderOrCartEntry.orderCode = '112';
    expect(component.getOwnerType()).toBe(
      CommonConfigurator.OwnerType.ORDER_ENTRY
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

  it("should return 'false' for disabled when readOnly true", () => {
    component.readOnly = true;
    expect(component.isDisabled()).toBe(false);
  });

  it('should return disabled value when readOnly false', () => {
    component.readOnly = false;
    component.disabled = true;
    expect(component.isDisabled()).toBe(component.disabled);
  });

  describe('Link text', () => {
    it("should be 'Display Configuration' in case component is included in readOnly mode", () => {
      component.readOnly = true;
      component.cartEntry = {
        entryNumber: 0,
        product: { configuratorType: configuratorType },
      };
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        'button',
        'configurator.header.displayConfiguration'
      );
    });

    it("sshould be 'Edit Configuration' in case component is included in edit mode", () => {
      component.readOnly = false;
      component.disabled = false;
      component.msgBanner = false;
      component.cartEntry = {
        entryNumber: 0,
        product: { configuratorType: configuratorType },
      };
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        'button',
        'configurator.header.editConfiguration'
      );
    });

    it("should be 'Resolve Issues' in case component is used in banner", () => {
      component.readOnly = false;
      component.msgBanner = true;
      component.cartEntry = {
        entryNumber: 0,
        product: { configuratorType: configuratorType },
      };
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        'button',
        'configurator.header.resolveIssues'
      );
    });
  });

  describe('Button', () => {
    it('should be disabled in case corresponding component attribute is disabled', () => {
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

    it('should be enabled in case corresponding component attribute is enabled', () => {
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
