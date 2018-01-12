import { TestBed, inject } from '@angular/core/testing';
import { SvgLoaderService } from './svg-loader.service';
import { Http, Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

class MockHttp {
  get() {
    return createResponse([]);
  }
}

function createResponse(body) {
  return Observable.of(
    new Response(new ResponseOptions({ body: JSON.stringify(body) }))
  );
}

const svgData = [{ id: 1 }];

fdescribe('SvgLoaderService', () => {
  let service: SvgLoaderService;
  let http: Http;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers: [{ provide: Http, useClass: MockHttp }, SvgLoaderService]
    });
    http = bed.get(Http);
    service = bed.get(SvgLoaderService);
  });

  it(
    'should create SvgLoaderService',
    inject([SvgLoaderService], (service: SvgLoaderService) => {
      expect(service).toBeTruthy();
    })
  );

  it('should load SVG', () => {
    spyOn(http, 'get').and.returnValue(createResponse([...svgData]));

    service
      .loadSVG(
        'https://localhost:9002/medias/logo-hybris-responsive.svg?context=bWFzdGVyfGltYWdlc3w1Mzc5fGltYWdlL3N2Zyt4bWx8aW1hZ2VzL2g3OS9oMmUvODc5NjMzMTY3MTU4Mi5zdmd8NzMzZWU0MjIwYTRjNDEyOWU1ZWEyNTAyNzMxYzM2MTliNDhlMGUxYTU2NDM2MzEyNTVjZDQ2MWY0NGQ3ZjdhZg&lang=en&curr=USD'
      )
      .subscribe(result => {
        console.log(result);
        expect(result).toEqual(JSON.stringify(svgData));
      });
  });
});
