import { TestBed } from '@angular/core/testing';
import { B2BUser } from '@spartacus/core';
import { LoadStatus } from '../model';
import { B2BUserCreationNotifierService } from './b2b-user-creation-notifier.service';

const mockB2Buser: B2BUser = {
  uid: 'test-user',
} as B2BUser;

describe('B2BUserCreationNotifierService', () => {
  let service: B2BUserCreationNotifierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(B2BUserCreationNotifierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should notify about user creation', () => {
    const testData = {
      status: LoadStatus.SUCCESS,
      item: mockB2Buser,
    };

    let emittedData;
    service.b2bUserCreated$.subscribe((data) => {
      emittedData = data;
    });

    service.notifyAboutUser(testData);

    expect(emittedData).toEqual(testData);
  });

  it('should not emit after unsubscribing', () => {
    const testData = {
      status: LoadStatus.SUCCESS,
      item: mockB2Buser,
    };

    let emittedData;
    const subscription = service.b2bUserCreated$.subscribe((data) => {
      emittedData = data;
    });

    subscription.unsubscribe();
    service.notifyAboutUser(testData);

    expect(emittedData).toBeUndefined();
  });
});
