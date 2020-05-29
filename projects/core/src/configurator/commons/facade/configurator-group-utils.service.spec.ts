import { async, TestBed } from '@angular/core/testing';
import { ConfiguratorGroupUtilsService } from './configurator-group-utils.service';
import { Type } from '@angular/core';
import { GROUP_ID_2, productConfiguration } from './configuration-test-data';

describe('ConfiguratorGroupUtilsService', () => {
  let classUnderTest: ConfiguratorGroupUtilsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ConfiguratorGroupUtilsService],
    }).compileComponents();
  }));

  beforeEach(() => {
    classUnderTest = TestBed.inject(
      ConfiguratorGroupUtilsService as Type<ConfiguratorGroupUtilsService>
    );
  });

  it('should be created', () => {
    expect(classUnderTest).toBeTruthy();
  });

  it('should find group from group Id', () => {
    const group = classUnderTest.getGroupById(
      productConfiguration.groups,
      GROUP_ID_2
    );

    expect(group).toBe(productConfiguration.groups[1]);
  });

  it('should find parent group from group', () => {
    const parentGroup = classUnderTest.getParentGroup(
      productConfiguration.groups,
      productConfiguration.groups[2].subGroups[0],
      null
    );

    expect(parentGroup).toBe(productConfiguration.groups[2]);
  });

  it('should check if subgroups exist', () => {
    expect(classUnderTest.hasSubGroups(productConfiguration.groups[0])).toBe(
      false
    );
    expect(classUnderTest.hasSubGroups(productConfiguration.groups[2])).toBe(
      true
    );
  });
});
