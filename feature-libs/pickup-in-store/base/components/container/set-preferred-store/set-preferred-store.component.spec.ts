import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import {
  PointOfServiceNames,
  PreferredStoreService,
} from '@spartacus/pickup-in-store/base/core';
import { IconTestingModule, OutletContextData } from '@spartacus/storefront';
import { MockPreferredStoreService } from 'feature-libs/pickup-in-store/core/services/preferred-store.service.spec';
import { of } from 'rxjs';
import { SetPreferredStoreComponent } from './set-preferred-store.component';

describe('SetPreferredStoreComponent without outlet.context$', () => {
  let component: SetPreferredStoreComponent;
  let fixture: ComponentFixture<SetPreferredStoreComponent>;
  let preferredStoreService: PreferredStoreService;

  const pointOfServiceName = {
    name: 'London School',
    displayName: 'London School',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetPreferredStoreComponent],
      imports: [I18nTestingModule, IconTestingModule, CommonModule],
      providers: [
        { provide: PreferredStoreService, useClass: MockPreferredStoreService },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(SetPreferredStoreComponent);
    component = fixture.componentInstance;
    preferredStoreService = TestBed.inject(PreferredStoreService);

    component.pointOfServiceName = pointOfServiceName;
    fixture.detectChanges();
  });

  it('should create set preferred store', () => {
    expect(component).toBeDefined();
  });

  it('should call setPreferredStore on preferredStoreService with pointOfServiceName', () => {
    spyOn(preferredStoreService, 'setPreferredStore');

    component.setAsPreferred();
    expect(preferredStoreService.setPreferredStore).toHaveBeenCalledWith(
      pointOfServiceName
    );
  });

  it('should set storeSelected$ to the return value of getPreferredStore on preferredStoreService', () => {
    component.storeSelected$.subscribe((item) => {
      expect(item?.name).toBe('London School');
      expect(item?.displayName).toBe('London School');
    });
  });
});

describe('SetPreferredStoreComponent with outlet.context$', () => {
  let component: SetPreferredStoreComponent;
  let fixture: ComponentFixture<SetPreferredStoreComponent>;
  let preferredStoreService: PreferredStoreService;

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
        { provide: PreferredStoreService, useClass: MockPreferredStoreService },
        { provide: OutletContextData, useValue: { context$ } },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(SetPreferredStoreComponent);
    component = fixture.componentInstance;
    preferredStoreService = TestBed.inject(PreferredStoreService);

    component.pointOfServiceName = pointOfServiceName;
    fixture.detectChanges();
  });

  it('should create set preferred store', () => {
    expect(component).toBeDefined();
  });

  it('should call setPreferredStore on preferredStoreService with pointOfServiceName', () => {
    spyOn(preferredStoreService, 'setPreferredStore');

    component.setAsPreferred();
    expect(preferredStoreService.setPreferredStore).toHaveBeenCalledWith(
      pointOfServiceName
    );
  });

  it('should set storeSelected$ to the return value of getPreferredStore on preferredStoreService', () => {
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
