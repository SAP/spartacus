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
import { CommonConfiguratorTestUtilsService } from 'feature-libs/product-configurator/common/testing/common-configurator-test-utils.service';
import { BehaviorSubject, of } from 'rxjs';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import * as ConfigurationTestData from '../../testing/configurator-test-data';

import { ConfiguratorResumeConfigDialogComponent } from './configurator-resume-config-dialog.component';

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

describe('ConfiguratorResumeConfigDialogComponent', () => {
  let component: ConfiguratorResumeConfigDialogComponent;
  let fixture: ComponentFixture<ConfiguratorResumeConfigDialogComponent>;
  let htmlElem: HTMLElement;

  let mockLaunchDialogService: LaunchDialogService;
  let mockConfigCommonsService: ConfiguratorCommonsService;
  let mockRoutingService: RoutingService;
  let mockProductService: ProductService;

  let dataSender: BehaviorSubject<
    { previousOwner: CommonConfigurator.Owner } | undefined
  >;

  function initialize() {
    dataSender = new BehaviorSubject<
      { previousOwner: CommonConfigurator.Owner } | undefined
    >({ previousOwner: owner });
    fixture = TestBed.createComponent(ConfiguratorResumeConfigDialogComponent);
    htmlElem = fixture.nativeElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockLaunchDialogService = TestBed.inject(LaunchDialogService);
    spyOn(mockLaunchDialogService, 'closeDialog');
  }

  class MockLaunchDialogService {
    closeDialog(): void {}
    data$ = dataSender;
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
          ConfiguratorResumeConfigDialogComponent,
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
    component.data$.subscribe({
      next: (data) => expect(data).toBeDefined(),
      complete: done,
    });
    dataSender.next(undefined);
    dataSender.complete();
  });

  it('should query product by owner id', () => {
    expect(mockProductService.get).toHaveBeenCalledWith(owner.id);
  });

  it('should render title and close, discard and resume buttons', () => {
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
      '.cx-configurator-dialog-discard'
    );

    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-configurator-dialog-resume'
    );
  });

  it('should close the dialog on resume', () => {
    fixture.debugElement
      .query(By.css('.cx-configurator-dialog-resume'))
      .triggerEventHandler('click');
    expect(mockLaunchDialogService.closeDialog).toHaveBeenCalled();
    expect(
      mockConfigCommonsService.forceNewConfiguration
    ).not.toHaveBeenCalled();
    expect(mockRoutingService.go).toHaveBeenCalledWith({
      cxRoute: 'configure' + product.configuratorType,
      params: {
        ownerType: CommonConfigurator.OwnerType.PRODUCT,
        entityKey: product.code,
      },
    });
  });

  it('should create a new default config on discard', () => {
    fixture.debugElement
      .query(By.css('.cx-configurator-dialog-discard'))
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
});
