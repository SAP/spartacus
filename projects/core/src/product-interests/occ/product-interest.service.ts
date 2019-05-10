import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, forkJoin } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';
import { OccConfig } from '../../occ/config/occ-config';
import {
  ProductInterestList,
  ProductInterestRelation,
  ProductInterestEntry,
} from '../model/product-interest.model';
import { Image } from '../../occ';

@Injectable()
export class OccProductInterestsService {
  constructor(
    private http: HttpClient,
    private occEndpoints: OccEndpointsService,
    private config: OccConfig
  ) {}

  public getInterests(
    userId: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): Observable<ProductInterestList> {
    const url = this.getEndPoint(userId);
    let params = new HttpParams().set('sort', sort ? sort : 'name:asc');

    if (pageSize) {
      params = params.set('pageSize', pageSize.toString());
    }
    if (currentPage) {
      params = params.set('currentPage', currentPage.toString());
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers, params }).pipe(
      tap((r: any) => {
        if (r.results) {
          r.results.forEach(
            (item: any) =>
              (item.product.images = this.convertImages(item.product.images))
          );
        }
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public deleteInterests(
    userId: string,
    item: ProductInterestRelation
  ): Observable<any[]> {
    const results: Observable<any>[] = [];
    item.productInterestEntry.forEach((entry: ProductInterestEntry) => {
      results.push(
        this.deleteInterest(userId, item.product.code, entry.interestType)
      );
    });
    return forkJoin(results);
  }

  public deleteInterest(
    userId: string,
    productCode: string,
    notificationType: string
  ): Observable<any> {
    const params: HttpParams = new HttpParams()
      .set('productCode', productCode)
      .set('notificationType', notificationType);
    return this.http
      .delete(this.getEndPoint(userId), { params: params })
      .pipe(catchError((error: any) => throwError(error)));
  }

  public createInterest(
    userId: string,
    productCode: string,
    notificationType: string
  ): Observable<ProductInterestRelation> {
    const params: HttpParams = new HttpParams()
      .set('productCode', productCode)
      .set('notificationType', notificationType);
    return this.http
      .post(this.getEndPoint(userId), {}, { params: params })
      .pipe(catchError((error: any) => throwError(error)));
  }

  public hasInterest(
    userId: string,
    productCode: string,
    notificationType: string
  ): Observable<boolean> {
    const url = this.getEndPoint(userId);
    let params = new HttpParams();
    if (productCode) {
      params = params.set('productCode', productCode);
    }
    if (notificationType) {
      params = params.set('notificationType', notificationType);
    }
    return this.http.get<boolean>(url, { params }).pipe(
      map((r: any) => r.results && r.results.length > 0),
      catchError((error: any) => throwError(error))
    );
  }

  protected getEndPoint(userId: string): string {
    return this.occEndpoints.getEndpoint(
      '/users/' + userId + '/productinterests'
    );
  }

  private convertImages(source: Image[]): any {
    const images = {};
    if (source) {
      for (const image of source) {
        const isList = image.hasOwnProperty('galleryIndex');
        if (!images.hasOwnProperty(image.imageType)) {
          images[image.imageType] = isList ? [] : {};
        }

        let imageContainer: any;
        if (isList && !images[image.imageType][image.galleryIndex]) {
          images[image.imageType][image.galleryIndex] = {};
        }

        if (isList) {
          imageContainer = images[image.imageType][image.galleryIndex];
        } else {
          imageContainer = images[image.imageType];
        }
        // set full image URL path
        image.url = (this.config.backend.occ.baseUrl || '') + image.url;

        imageContainer[image.format] = image;
      }
    }
    return images;
  }
}
