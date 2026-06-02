import { TestBed } from '@angular/core/testing';
import { FacadeFactoryService } from './facade-factory.service';
import { Injectable } from '@angular/core';
import { facadeFactory } from './facade-factory';
import { FacadeDescriptor } from './facade-descriptor';
import createSpy = jasmine.createSpy;

@Injectable()
abstract class TestFacade {}

function facadeResult() {}

class MockFacadeFactoryService implements Partial<FacadeFactoryService> {
  create = createSpy('create').and.returnValue(facadeResult);
}

const TEST_FEATURE_NAME = 'testFeature';

const testFacadeDescriptor: FacadeDescriptor<TestFacade> = {
  facade: TestFacade,
  feature: TEST_FEATURE_NAME,
};

function testFacadeFactory() {
  return facadeFactory(testFacadeDescriptor);
}

describe('FacadeFactoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: TestFacade,
          useFactory: testFacadeFactory,
        },
        {
          provide: FacadeFactoryService,
          useClass: MockFacadeFactoryService,
        },
      ],
    });
  });

  it('should call FacadeFactoryService.create and return result', () => {
    const result = TestBed.inject(TestFacade);
    const facadeFactoryService = TestBed.inject(FacadeFactoryService);
    expect(facadeFactoryService.create).toHaveBeenCalledWith(
      testFacadeDescriptor as any
    );
    expect(result).toBe(facadeResult);
  });
});
