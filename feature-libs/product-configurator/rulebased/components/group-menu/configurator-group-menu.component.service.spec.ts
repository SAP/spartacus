import { TestBed } from '@angular/core/testing';
import { ConfiguratorGroupMenuService } from './configurator-group-menu.component.service';

describe('ConfiguratorGroupMenuService', () => {
  let classUnderTest: ConfiguratorGroupMenuService;

  beforeEach(() => {
    classUnderTest = TestBed.inject(ConfiguratorGroupMenuService);
  });

  describe('getTabs', () => {
    xit('should return null', () => {
      expect(classUnderTest['getTabs']()).toBe(null);
    });
  });
});
