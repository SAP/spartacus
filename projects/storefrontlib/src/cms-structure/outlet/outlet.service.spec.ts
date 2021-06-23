import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  NgModule,
  TemplateRef,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OutletRefDirective } from './outlet-ref/outlet-ref.directive';
import { OutletPosition, USE_STACKED_OUTLETS } from './outlet.model';
import { OutletService } from './outlet.service';

const OUTLET_NAME_1 = 'OUTLET.1';
const OUTLET_NAME_2 = 'OUTLET.2';
const OUTLET_NAME_3 = 'OUTLET.3';
const OUTLET_NAME_4 = 'OUTLET.4';

@Component({
  template: `
    <ng-template cxOutletRef="${OUTLET_NAME_1}"> </ng-template>
    <ng-template cxOutletRef="${OUTLET_NAME_2}" cxOutletPos="before">
    </ng-template>
    <ng-template cxOutletRef="${OUTLET_NAME_3}" cxOutletPos="after">
    </ng-template>
    <ng-template cxOutletRef="${OUTLET_NAME_4}" cxOutletPos="before">
    </ng-template>
    <ng-template cxOutletRef="${OUTLET_NAME_4}" cxOutletPos="before">
    </ng-template>
  `,
})
class TestContainerComponent {}

@Component({
  template: ` any `,
})
class AnyComponent {}

@Component({
  template: ` any2 `,
})
class Any2Component {}
@NgModule({
  declarations: [AnyComponent, Any2Component],
})
class AnyModule {}

describe('OutletService', () => {
  let outletService: OutletService<TemplateRef<any> | ComponentFactory<any>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AnyModule],
      declarations: [TestContainerComponent, OutletRefDirective],
      providers: [OutletService],
    }).compileComponents();

    outletService = TestBed.inject(OutletService);
  });

  it('should be created', () => {
    expect(outletService).toBeTruthy();
  });

  describe('Add TemplateRef', () => {
    let fixture: ComponentFixture<TestContainerComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestContainerComponent);
      fixture.detectChanges();
    });

    describe('BEFORE position', () => {
      it('should have TemplateRef', () => {
        expect(
          outletService.get(OUTLET_NAME_2, OutletPosition.BEFORE) instanceof
            TemplateRef
        ).toBeTruthy();
      });

      it('should have TemplateRef', () => {
        expect(outletService.get(OUTLET_NAME_2)).toBeFalsy();
      });

      it('should have TemplateRef', () => {
        expect(
          outletService.get(OUTLET_NAME_2, OutletPosition.AFTER)
        ).toBeFalsy();
      });
    });

    describe('REPLACE position', () => {
      it('should have TemplateRef', () => {
        expect(
          outletService.get(OUTLET_NAME_1) instanceof TemplateRef
        ).toBeTruthy();
      });
      it('should not have TemplateRef for BEFORE', () => {
        expect(
          outletService.get(OUTLET_NAME_1, OutletPosition.BEFORE)
        ).toBeFalsy();
      });
      it('should not have TemplateRef for AFTER', () => {
        expect(
          outletService.get(OUTLET_NAME_1, OutletPosition.AFTER)
        ).toBeFalsy();
      });
    });

    describe('AFTER position', () => {
      it('should have TemplateRef', () => {
        expect(
          outletService.get(OUTLET_NAME_3, OutletPosition.AFTER) instanceof
            TemplateRef
        ).toBeTruthy();
      });

      it('should have TemplateRef', () => {
        expect(outletService.get(OUTLET_NAME_3)).toBeFalsy();
      });

      it('should have TemplateRef', () => {
        expect(
          outletService.get(OUTLET_NAME_3, OutletPosition.BEFORE)
        ).toBeFalsy();
      });
    });
  });

  describe('Add Component Factory', () => {
    let componentFactoryResolver: ComponentFactoryResolver;
    let factory: ComponentFactory<any>;

    beforeEach(() => {
      componentFactoryResolver = TestBed.inject(ComponentFactoryResolver);
      factory = componentFactoryResolver.resolveComponentFactory(AnyComponent);
    });

    describe('REPLACE position', () => {
      it('should return a factory', () => {
        outletService.add(OUTLET_NAME_2, factory);
        expect(
          outletService.get(OUTLET_NAME_2) instanceof ComponentFactory
        ).toBeTruthy();
      });

      it('should not return a factory', () => {
        outletService.add(OUTLET_NAME_2, factory, OutletPosition.BEFORE);
        expect(outletService.get(OUTLET_NAME_2)).toBeFalsy();
      });
      it('should not return a factory', () => {
        outletService.add(OUTLET_NAME_2, factory, OutletPosition.AFTER);
        expect(outletService.get(OUTLET_NAME_2)).toBeFalsy();
      });
    });

    describe('BEFORE position', () => {
      it('should return a factory', () => {
        outletService.add(OUTLET_NAME_2, factory, OutletPosition.BEFORE);
        expect(
          outletService.get(OUTLET_NAME_2, OutletPosition.BEFORE) instanceof
            ComponentFactory
        ).toBeTruthy();
      });

      it('should not return a factory', () => {
        outletService.add(OUTLET_NAME_2, factory);
        expect(
          outletService.get(OUTLET_NAME_2, OutletPosition.BEFORE) instanceof
            ComponentFactory
        ).toBeFalsy();
      });

      it('should not return a factory', () => {
        outletService.add(OUTLET_NAME_2, factory, OutletPosition.AFTER);
        expect(
          outletService.get(OUTLET_NAME_2, OutletPosition.BEFORE) instanceof
            ComponentFactory
        ).toBeFalsy();
      });
    });

    describe('AFTER position', () => {
      it('should return a factory', () => {
        outletService.add(OUTLET_NAME_2, factory, OutletPosition.AFTER);
        expect(
          outletService.get(OUTLET_NAME_2, OutletPosition.AFTER) instanceof
            ComponentFactory
        ).toBeTruthy();
      });

      it('should not return a factory', () => {
        outletService.add(OUTLET_NAME_2, factory);
        expect(
          outletService.get(OUTLET_NAME_2, OutletPosition.AFTER)
        ).toBeFalsy();
      });

      it('should not return a factory', () => {
        outletService.add(OUTLET_NAME_2, factory, OutletPosition.BEFORE);
        expect(
          outletService.get(OUTLET_NAME_2, OutletPosition.AFTER)
        ).toBeFalsy();
      });
    });
  });

  describe('singular vs plural', () => {
    let fixture: ComponentFixture<TestContainerComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestContainerComponent);
      fixture.detectChanges();
    });

    it('should return a single outlet for existing API usage', () => {
      expect(
        outletService.get(OUTLET_NAME_4, OutletPosition.BEFORE) instanceof Array
      ).toBeFalsy();
    });

    it('should return an array of outlet templates/components', () => {
      expect(
        outletService.get(
          OUTLET_NAME_4,
          OutletPosition.BEFORE,
          USE_STACKED_OUTLETS
        ) instanceof Array
      ).toBeTruthy();
    });
  });

  describe('remove', () => {
    let componentFactoryResolver: ComponentFactoryResolver;
    let factory: ComponentFactory<any>;
    let factory2: ComponentFactory<any>;

    beforeEach(() => {
      componentFactoryResolver = TestBed.inject(ComponentFactoryResolver);
      factory = componentFactoryResolver.resolveComponentFactory(AnyComponent);
      factory2 =
        componentFactoryResolver.resolveComponentFactory(Any2Component);
    });

    it('should remove all instance of the provided value', () => {
      outletService.add(OUTLET_NAME_1, factory, OutletPosition.AFTER);
      outletService.add(OUTLET_NAME_2, factory, OutletPosition.AFTER);
      outletService.add(OUTLET_NAME_2, factory, OutletPosition.AFTER);
      outletService.add(OUTLET_NAME_2, factory2, OutletPosition.AFTER);
      outletService.add(OUTLET_NAME_2, factory, OutletPosition.BEFORE);

      outletService.remove(OUTLET_NAME_2, OutletPosition.AFTER, factory);

      expect(outletService.get(OUTLET_NAME_1, OutletPosition.AFTER)).toEqual(
        factory
      );
      expect(outletService.get(OUTLET_NAME_2, OutletPosition.BEFORE)).toEqual(
        factory
      );
      expect(
        outletService.get(OUTLET_NAME_2, OutletPosition.AFTER, true)
      ).toEqual([factory2]);

      outletService.remove(OUTLET_NAME_2, OutletPosition.AFTER, factory2);
      expect(
        outletService.get(OUTLET_NAME_2, OutletPosition.AFTER, true)
      ).toEqual([]);
    });

    it('should remove all templates when not provided specific value', () => {
      outletService.add(OUTLET_NAME_1, factory, OutletPosition.BEFORE);
      outletService.add(OUTLET_NAME_1, factory2, OutletPosition.BEFORE);

      expect(
        outletService.get(OUTLET_NAME_1, OutletPosition.BEFORE, true)
      ).toEqual([factory, factory2]);

      outletService.remove(OUTLET_NAME_1, OutletPosition.BEFORE);
      expect(outletService.get(OUTLET_NAME_1, OutletPosition.BEFORE)).toEqual(
        undefined
      );
    });
  });
});
