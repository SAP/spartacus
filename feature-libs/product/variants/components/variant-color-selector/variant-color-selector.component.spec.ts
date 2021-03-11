import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  I18nTestingModule,
  BaseOption,
  VariantType,
  RoutingService,
  UrlCommands,
  VariantQualifier,
} from '@spartacus/core';
import { VariantColorSelectorComponent } from './variant-color-selector.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationExtras } from '@angular/router';

const mockVariant: BaseOption = {
  selected: {
    code: 'test',
    variantOptionQualifiers: [
      {
        value: '123',
        image: {
          url: 'http://test1-thumbnail.com',
        },
        qualifier: VariantQualifier.COLOR,
      },
      {
        value: '555',
        qualifier: VariantQualifier.STYLE,
      },
    ],
  },
  options: [],
  variantType: VariantType.SIZE,
};

class MockRoutingService {
  go(
    _commands: any[] | UrlCommands,
    _query?: object,
    _extras?: NavigationExtras
  ): void {}
}

describe('VariantColorSelectorComponent', () => {
  let component: VariantColorSelectorComponent;
  let fixture: ComponentFixture<VariantColorSelectorComponent>;
  let routingService: RoutingService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [VariantColorSelectorComponent],
        imports: [RouterTestingModule, I18nTestingModule],
        providers: [{ provide: RoutingService, useClass: MockRoutingService }],
      }).compileComponents();

      routingService = TestBed.inject(RoutingService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantColorSelectorComponent);
    component = fixture.componentInstance;
    component.variants = mockVariant;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to product given code and name', () => {
    spyOn(routingService, 'go').and.callThrough();
    component.changeColor('test1', 'testProduct');
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'product',
      params: { code: 'test1', name: 'testProduct' },
    });
  });

  it('should find variant with proper qualifier', () => {
    const result = component.getVariantOptionValue(
      mockVariant.selected.variantOptionQualifiers
    );
    expect(result).toEqual(
      mockVariant.selected.variantOptionQualifiers[0].value
    );
  });
});
