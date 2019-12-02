import { Type } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { ConfigUtilsService } from './config-utils.service';

describe('ConfigUtilsService', () => {
  let serviceUnderTest: ConfigUtilsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({}).compileComponents();
  }));
  beforeEach(() => {
    serviceUnderTest = TestBed.get(ConfigUtilsService as Type<
      ConfigUtilsService
    >);
  });

  it('should create component', () => {
    expect(serviceUnderTest).toBeDefined();
  });
});
