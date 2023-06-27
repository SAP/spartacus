import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import {
  PointOfServiceNames,
  PreferredStoreFacade,
} from '@spartacus/pickup-in-store/root';
import { IconTestingModule, OutletContextData } from '@spartacus/storefront';
import { of } from 'rxjs';
import { MockPreferredStoreService } from '../../../core/services/preferred-store.service.spec';
import { SetPreferredStoreComponent } from './set-preferred-store.component';

describe('SetPreferredStoreComponent without outlet.context$', () => {
  let component: SetPreferredStoreComponent;
  let fixture: ComponentFixture<SetPreferredStoreComponent>;
  let preferredStoreFacade: PreferredStoreFacade;

  const pointOfServiceName = {
    name: 'London School',
    displayName: 'London School',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetPreferredStoreComponent],
      imports: [I18nTestingModule, IconTestingModule, CommonModule],
      providers: [
        { provide: PreferredStoreFacade, useClass: MockPreferredStoreService },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(SetPreferredStoreComponent);
    component = fixture.componentInstance;
    preferredStoreFacade = TestBed.inject(PreferredStoreFacade);

    component.pointOfServiceName = pointOfServiceName;
    fixture.detectChanges();
  });

  it('should create set preferred store', () => {
    expect(component).toBeDefined();
  });

  it('should call setPreferredStore on preferredStoreFacade with pointOfServiceName', () => {
    spyOn(preferredStoreFacade, 'setPreferredStore');

    component.setAsPreferred();
    expect(preferredStoreFacade.setPreferredStore).toHaveBeenCalledWith(
      pointOfServiceName
    );
  });

  it('should set storeSelected$ to the return value of getPreferredStore on preferredStoreFacade', () => {
    component.storeSelected$.subscribe((item) => {
      expect(item?.name).toBe('London School');
      expect(item?.displayName).toBe('London School');
    });
  });
});

describe('SetPreferredStoreComponent with outlet.context$', () => {
  let component: SetPreferredStoreComponent;
  let fixture: ComponentFixture<SetPreferredStoreComponent>;
  let preferredStoreFacade: PreferredStoreFacade;

  const pointOfServiceName: PointOfServiceNames = {
    name: 'London School',
    displayName: 'London School',
  };

  const context$ = of(pointOfServiceName);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetPreferredStoreComponent],
      imports: [I18nTestingModule, IconTestingModule, CommonModule],
      providers: [
        { provide: PreferredStoreFacade, useClass: MockPreferredStoreService },
        { provide: OutletContextData, useValue: { context$ } },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(SetPreferredStoreComponent);
    component = fixture.componentInstance;
    preferredStoreFacade = TestBed.inject(PreferredStoreFacade);

    component.pointOfServiceName = pointOfServiceName;
    fixture.detectChanges();
  });

  it('should create set preferred store', () => {
    expect(component).toBeDefined();
  });

  it('should call setPreferredStore on preferredStoreFacade with pointOfServiceName', () => {
    spyOn(preferredStoreFacade, 'setPreferredStore');

    component.setAsPreferred();
    expect(preferredStoreFacade.setPreferredStore).toHaveBeenCalledWith(
      pointOfServiceName
    );
  });

  it('should set storeSelected$ to the return value of getPreferredStore on preferredStoreFacade', () => {
    component.storeSelected$.subscribe((item) => {
      expect(item?.name).toBe('London School');
      expect(item?.displayName).toBe('London School');
    });
  });
});

/**
 * This is a stub of the SetPreferredStoreComponent with the same inputs
 * for the purposes of testing the components that wrap it.
 */
@Component({
  selector: 'cx-set-preferred-store',
  template: '',
})
export class SetPreferredStoreStubComponent {
  @Input() pointOfServiceName: PointOfServiceNames;
}
