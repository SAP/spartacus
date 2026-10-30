/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UserIdService } from '@spartacus/core';
import { of } from 'rxjs';
import { CustomPageTemplate } from '../../../cms/model/page.model';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { OccCmsPageTemplateAdapter } from './occ-cms-page-template.adapter';

const mockTemplate: CustomPageTemplate = {
  id: 'testTemplate',
  name: 'Test Template',
  origin: 'CUSTOM',
  shellTemplate: 'ShellComponent',
};

const MOCK_URL = '/users/testUser/cms/pageTemplates/testTemplate';

class OccEndpointsServiceMock {
  buildUrl(_endpoint: string, _options?: any): string {
    return MOCK_URL;
  }
}

describe('OccCmsPageTemplateAdapter', () => {
  let adapter: OccCmsPageTemplateAdapter;
  let httpMock: HttpTestingController;
  let endpointsService: OccEndpointsService;
  let userIdService: UserIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccCmsPageTemplateAdapter,
        UserIdService,
        { provide: OccEndpointsService, useClass: OccEndpointsServiceMock },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    adapter = TestBed.inject(OccCmsPageTemplateAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    endpointsService = TestBed.inject(OccEndpointsService);
    userIdService = TestBed.inject(UserIdService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(adapter).toBeTruthy();
  });

  describe('load', () => {
    beforeEach(() => {
      vi.spyOn(userIdService, 'getUserId').mockReturnValue(of('testUser'));
    });

    it('should call userIdService.getUserId', () => {
      adapter.load('testTemplate').subscribe();
      httpMock.expectOne(MOCK_URL).flush(mockTemplate);
      expect(userIdService.getUserId).toHaveBeenCalled();
    });

    it('should call occEndpoints.buildUrl with pageTemplate endpoint and correct params', () => {
      vi.spyOn(endpointsService, 'buildUrl').mockReturnValue(MOCK_URL);
      adapter.load('testTemplate').subscribe();
      httpMock.expectOne(MOCK_URL).flush(mockTemplate);
      expect(endpointsService.buildUrl).toHaveBeenCalledWith('pageTemplate', {
        urlParams: { userId: 'testUser', pageTemplateId: 'testTemplate' },
      });
    });

    it('should make a GET request to the built URL', () => {
      adapter.load('testTemplate').subscribe();
      const req = httpMock.expectOne(MOCK_URL);
      expect(req.request.method).toBe('GET');
      req.flush(mockTemplate);
    });

    it('should return the template data from the HTTP response', () => {
      let result: CustomPageTemplate | undefined;
      adapter.load('testTemplate').subscribe((r) => (result = r));
      httpMock.expectOne(MOCK_URL).flush(mockTemplate);
      expect(result).toEqual(mockTemplate);
    });

    it('should set Content-Type header to application/json', () => {
      adapter.load('testTemplate').subscribe();
      const req = httpMock.expectOne(MOCK_URL);
      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      req.flush(mockTemplate);
    });

    it('should complete after one emission (take(1))', () => {
      let completed = false;
      adapter.load('testTemplate').subscribe({ complete: () => (completed = true) });
      httpMock.expectOne(MOCK_URL).flush(mockTemplate);
      expect(completed).toBe(true);
    });
  });
});
