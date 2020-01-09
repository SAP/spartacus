import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';
import { OccPersonalizationContextInterceptor } from './occ-personalization-context.interceptor';
import { PersonalizationContextService } from '../services/personalization-context.service';
import { PersonalizationConfig } from '@spartacus/core';

const mockPersonalizationConfig: PersonalizationConfig = {
  personalization: {
    enabled: true,
    context: {
      slotId: 'PlaceholderContentSlot',
      componentId: 'PersonalizationScriptComponent',
    },
  },
};

const endpoint = '/test';
class OccEndpointsServiceMock {
  getBaseEndpoint(): string {
    return endpoint;
  }
}

describe('OccPersonalizationContextInterceptor', () => {
  let httpMock: HttpTestingController;
  const personalizationContextService: PersonalizationContextService = new PersonalizationContextService();

  const personalizationContext = {
    actions: [
      {
        customization_name: btoa('customization_name1'),
        customization_code: btoa('customization_code1'),
        variation_name: btoa('variation_name1'),
        variation_code: btoa('variation_code1'),
        action_name: btoa('action_name1'),
        action_code: btoa('action_code1'),
      },
      {
        customization_name: btoa('customization_name2'),
        customization_code: btoa('customization_code2'),
        variation_name: btoa('variation_name2'),
        variation_code: btoa('variation_code2'),
        action_name: btoa('action_name2'),
        action_code: btoa('action_code2'),
      },
    ],
    segments: [btoa('segment1'), btoa('segment2')],
  };
  const personalizationContextBase64 = btoa(
    JSON.stringify(personalizationContext)
  );
  const scriptComponent = {
    contentSlots: {
      contentSlot: [
        {
          slotId: 'PlaceholderContentSlot',
          components: {
            component: [
              {
                uid: 'PersonalizationScriptComponent',
                properties: {
                  script: {
                    data: personalizationContextBase64,
                  },
                },
              },
            ],
          },
        },
      ],
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: PersonalizationConfig, useValue: mockPersonalizationConfig },
        { provide: OccEndpointsService, useClass: OccEndpointsServiceMock },
        {
          provide: PersonalizationContextService,
          useValue: personalizationContextService,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: OccPersonalizationContextInterceptor,
          multi: true,
        },
      ],
    });

    httpMock = TestBed.get(HttpTestingController as Type<
      HttpTestingController
    >);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should set personalization context if PersonalizationScriptComponent exists in response', inject(
    [HttpClient],
    (http: HttpClient) => {
      http.get('https://localhost:9002/test').subscribe(result => {
        expect(result).toBeTruthy();
      });

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'GET';
      });

      mockReq.flush(scriptComponent);

      personalizationContextService
        .getPersonalizationContext()
        .subscribe(value => {
          expect(value.segments[0]).toEqual('segment1');
          expect(value.segments[1]).toEqual('segment2');
          expect(value.actions[0].customization_code).toEqual(
            'customization_code1'
          );
          expect(value.actions[1].customization_code).toEqual(
            'customization_code2'
          );
        });
    }
  ));
});
