import { Component, Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  I18nTestingModule,
  Product,
  ProductService,
  RoutingService,
} from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import {
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
import { BehaviorSubject, of } from 'rxjs';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import * as ConfigurationTestData from '../../testing/configurator-test-data';
import { ConfiguratorRestartDialogComponent } from './configurator-restart-dialog.component';

const owner: CommonConfigurator.Owner =
  ConfigurationTestData.productConfiguration.owner;

const product: Product = { code: 'pCode' };

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

@Directive({
  selector: '[cxFocus]',
})
export class MockKeyboadFocusDirective {
  @Input('cxFocus') config: FocusConfig = {};
}

describe('ConfiguratorRestartDialogComponent', () => {
  let component: ConfiguratorRestartDialogComponent;
  let fixture: ComponentFixture<ConfiguratorRestartDialogComponent>;
  let htmlElem: HTMLElement;

  let mockLaunchDialogService: LaunchDialogService;
  let mockConfigCommonsService: ConfiguratorCommonsService;
  let mockRoutingService: RoutingService;
  let mockProductService: ProductService;

  let dialogDataSender: BehaviorSubject<
    { owner: CommonConfigurator.Owner } | undefined
  >;

  function initialize() {
    dialogDataSender = new BehaviorSubject<
      { owner: CommonConfigurator.Owner } | undefined
    >({ owner: owner });
    fixture = TestBed.createComponent(ConfiguratorRestartDialogComponent);
    htmlElem = fixture.nativeElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockLaunchDialogService = TestBed.inject(LaunchDialogService);
    spyOn(mockLaunchDialogService, 'closeDialog');
  }

  class MockLaunchDialogService {
    closeDialog(): void {}
    data$ = dialogDataSender;
  }

  function initializeMocks() {
    mockConfigCommonsService = jasmine.createSpyObj(['forceNewConfiguration']);
    mockRoutingService = jasmine.createSpyObj(['go']);
    mockProductService = jasmine.createSpyObj(['get']);
    asSpy(mockProductService.get).and.returnValue(of(product));
  }

  function asSpy(f: any) {
    return <jasmine.Spy>f;
  }

  beforeEach(
    waitForAsync(() => {
      initializeMocks();
      TestBed.configureTestingModule({
        declarations: [
          ConfiguratorRestartDialogComponent,
          MockCxIconComponent,
          MockKeyboadFocusDirective,
        ],
        imports: [I18nTestingModule],
        providers: [
          { provide: LaunchDialogService, useClass: MockLaunchDialogService },
          {
            provide: ConfiguratorCommonsService,
            useValue: mockConfigCommonsService,
          },
          {
            provide: RoutingService,
            useValue: mockRoutingService,
          },
          {
            provide: ProductService,
            useValue: mockProductService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    initialize();
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should ignore invalid dialog data', (done) => {
    component.dialogData$.subscribe({
      next: (dialogData: any) => expect(dialogData).toBeDefined(),
      complete: done,
    });
    dialogDataSender.next(undefined);
    dialogDataSender.complete();
  });

  it('should query product by owner id', () => {
    expect(mockProductService.get).toHaveBeenCalledWith(owner.id);
  });

  it('should render title, description and close, restart and resume buttons', () => {
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-dialog-title'
    );

    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.close'
    );

    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '#cx-configurator-restart-dialog-description'
    );

    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.btn-primary'
    );

    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.btn-secondary'
    );
  });

  it('should close the dialog on resume', () => {
    fixture.debugElement
      .query(By.css('.btn-primary'))
      .triggerEventHandler('click');
    expect(mockLaunchDialogService.closeDialog).toHaveBeenCalled();
    expect(
      mockConfigCommonsService.forceNewConfiguration
    ).not.toHaveBeenCalled();
    expect(mockRoutingService.go).toHaveBeenCalledWith(
      {
        cxRoute: 'configure' + product.configuratorType,
        params: {
          ownerType: CommonConfigurator.OwnerType.PRODUCT,
          entityKey: product.code,
        },
      },
      {
        queryParams: {
          productCode: product.code,
        },
      }
    );
  });

  it('should create a new default config on restart', () => {
    fixture.debugElement
      .query(By.css('.btn-secondary'))
      .triggerEventHandler('click');
    expect(mockLaunchDialogService.closeDialog).toHaveBeenCalled();
    expect(mockConfigCommonsService.forceNewConfiguration).toHaveBeenCalledWith(
      owner
    );
    expect(mockRoutingService.go).not.toHaveBeenCalled();
  });

  it('close should navigate back to PDP on close', () => {
    fixture.debugElement.query(By.css('.close')).triggerEventHandler('click');
    checkBackToPDPBehavior();
  });

  it('should navigate back to PDP on escape', () => {
    fixture.debugElement
      .query(By.css('.cx-modal-content'))
      .triggerEventHandler('esc');
    checkBackToPDPBehavior();
  });

  function checkBackToPDPBehavior() {
    expect(mockLaunchDialogService.closeDialog).toHaveBeenCalled();
    expect(
      mockConfigCommonsService.forceNewConfiguration
    ).not.toHaveBeenCalled();
    expect(mockRoutingService.go).toHaveBeenCalledWith({
      cxRoute: 'product',
      params: product,
    });
  }
  describe('Accessibility', () => {
    it("should contain action button element with class name 'close' and 'title' attribute that indicates the text for close button", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'button',
        'close',
        0,
        'title',
        'configurator.a11y.closeRestartDialog'
      );
    });
    it("should contain action button element with class name 'cx-configurator-dialog-resume' and 'aria-describedby' attribute that points to the text for the resume button", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'button',
        'btn-primary',
        0,
        'aria-describedby',
        'cx-configurator-restart-dialog-description'
      );
    });
    it("should contain action button element with class name 'cx-configurator-dialog-discard' and 'aria-describedby' attribute that points to the text for the start new button", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'button',
        'btn-secondary',
        0,
        'aria-describedby',
        'cx-configurator-restart-dialog-description'
      );
    });
    it("should contain 'role' and 'aria-modal' attributes that indicate that the appeared pop-up is a modal dialog", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'cx-modal-container',
        0,
        'aria-modal',
        'true'
      );
    });
  });
});
