import { Type } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { Configurator } from 'projects/core/src/model';
import { ConfigUtilsService } from './config-utils.service';

const productCode = 'CONF_LAPTOP';
let owner: Configurator.Owner = null;

describe('ConfigUtilsService', () => {
  let serviceUnderTest: ConfigUtilsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({}).compileComponents();
  }));
  beforeEach(() => {
    serviceUnderTest = TestBed.get(ConfigUtilsService as Type<
      ConfigUtilsService
    >);
    owner = {};
  });

  it('should create component', () => {
    expect(serviceUnderTest).toBeDefined();
  });

  it('should set key for product related owner', () => {
    owner.type = Configurator.OwnerType.PRODUCT;
    owner.id = productCode;
    serviceUnderTest.setOwnerKey(owner);
    expect(owner.key.includes(productCode)).toBe(true);
    expect(owner.key.includes(Configurator.OwnerType.PRODUCT)).toBe(true);
  });

  it('should set key for document related owner', () => {
    owner.type = Configurator.OwnerType.CART_ENTRY;
    owner.id = '1';
    serviceUnderTest.setOwnerKey(owner);
    expect(owner.key.includes(owner.id)).toBe(true);
    expect(owner.key.includes(Configurator.OwnerType.CART_ENTRY)).toBe(true);
  });

  it('should throw an error if no owner type is present', () => {
    expect(function() {
      serviceUnderTest.setOwnerKey(owner);
    }).toThrow();
  });

  it('should throw an error if for owner type PRODUCT if no product code is present', () => {
    owner.type = Configurator.OwnerType.PRODUCT;
    expect(function() {
      serviceUnderTest.setOwnerKey(owner);
    }).toThrow();
  });

  it('should throw an error if for owner type CART_ENTRY if no cart entry link is present', () => {
    owner.type = Configurator.OwnerType.CART_ENTRY;
    expect(function() {
      serviceUnderTest.setOwnerKey(owner);
    }).toThrow();
  });
});
