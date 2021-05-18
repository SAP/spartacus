import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { ConverterService, OccEndpointsService, User } from "@spartacus/core";
import { USER_PROFILE_SERIALIZER } from "@spartacus/user/profile/core";
import { CdcUserProfileAdapter } from "./cdc-user-profile.adapter";

export class MockOccEndpointsService {
    getUrl(endpointKey: string, _urlParams?: object, _queryParams?: object) {
      return this.getEndpoint(endpointKey);
    }
    getEndpoint(endpoint: string) {
        if (!endpoint.startsWith('/')) {
          endpoint = '/' + endpoint;
        }
        return endpoint;
    }
}

describe('CdcUserProfileAdapter', ()=> {
    let cdcUserProfileAdapter: CdcUserProfileAdapter;
    let httpMock: HttpTestingController;
    let occEndpointsService: OccEndpointsService;
    let converter: ConverterService;

    beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          providers: [
            CdcUserProfileAdapter,
            {
              provide: OccEndpointsService,
              useClass: MockOccEndpointsService,
            },
          ],
        });

    cdcUserProfileAdapter = TestBed.inject(CdcUserProfileAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    occEndpointsService = TestBed.inject(OccEndpointsService);
    converter = TestBed.inject(ConverterService);

    spyOn(converter, 'convert').and.callThrough();
    spyOn(occEndpointsService, 'getUrl').and.callThrough();
});
    const username = 'mockUsername';
    const password = '1234';

    const user: User = {
        customerId: username,
        displayUid: password,
      };
    afterEach(() => {
        httpMock.verify();
    });

    describe('update user details', () => {
        it('should update user details for the given username', () => {
          const userUpdates: User = {
            title: 'mr',
          };
          cdcUserProfileAdapter.update(username, userUpdates).subscribe();
    
          const mockReq = httpMock.expectOne((req) => {
            return req.method === 'PATCH';
          });
          expect(occEndpointsService.getUrl).toHaveBeenCalledWith('users/${userId}', {
            userId: user.customerId,
          });
    
          expect(mockReq.cancelled).toBeFalsy();
          expect(mockReq.request.responseType).toEqual('json');
          expect(mockReq.request.body).toEqual(userUpdates);
          mockReq.flush(userUpdates);
        });
    
        it('should use converter', () => {
          const userUpdates: User = {
            title: 'mr',
          };
    
          cdcUserProfileAdapter.update(username, userUpdates).subscribe();
          httpMock
            .expectOne((req) => {
              return req.method === 'PATCH';
            })
            .flush(userUpdates);
          expect(converter.convert).toHaveBeenCalledWith(
            userUpdates,
            USER_PROFILE_SERIALIZER
          );
        });
      });
});