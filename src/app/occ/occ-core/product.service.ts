// import { Injectable } from '@angular/core';
// import { Http, Response, Headers } from '@angular/http';
// import { Observable } from 'rxjs/Rx';
// import { OccBaseService } from './occ-base.service';
// import { ProductOCCData } from './product.typing';
// import { Review } from '../product/product-reviews/review';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

const PRODUCT_ENDPOINT = 'products/';

@Injectable()
export class OccProductService extends BaseService {

    loadProduct(productCode: string) {
        let url = this.getProductEndpoint();
        url += '/' + productCode;
        url += '?fields=FULL'; // BASIC, DEFAULT, FULL

        return new Promise((resolve) => {
            this.http.get(url).subscribe((data) => {
                const productData = data.json();
                resolve(productData);
            },
            err => this.logError(err));
        });
    }

//     loadProductReviews(productCode: string) {

//         let url = this.createEndPoint(PRODUCT_ENDPOINT);
//         url += productCode;
//         url += '/reviews';

//         return new Promise((resolve) => {
//             this.http.get(url).subscribe((data) => {
//                 let occData = data.json();
//                 // console.log(occData);
//                 resolve(occData);
//             },
//             err => this.logError(err));
//         });
//     }


//   public createReview = (productCode: string, review: Review): Observable<any> => {

//         let toAdd = JSON.stringify(review);
      
//         let url = this.createEndPoint(PRODUCT_ENDPOINT);
//         url += productCode;
//         url += '/reviews';
//         url += '?alias=' + review.alias;
//         url += '&comment=' + review.comment;
//         url += '&headline=' + review.headline;
//         url += '&rating=' + review.rating;

//     //   url += '?comment=test&headline=hhh&rating=3';

//         let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

//         return this.http.post(url, toAdd, { headers: headers })
//           .map((response: Response) => response.json())
//           .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
//   }
  


//     loadProductReferences = (productCode: string): Observable<any> => {

//         let url = this.createEndPoint(PRODUCT_ENDPOINT);
//         url += productCode;
        
//         // let url = 'https://localhost:9002/rest/v2/electronics/products/' + productCode;
//         url += '?fields=productReferences';

//         let headers = new Headers({ 'Content-Type': 'application/json' });

//         return this.http.get(url, {headers: headers })
//             .map((response: Response) => response.json())
//             .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
//     }
    
    logError(err) {
        console.error('There was an error: ' + err);
    }

}
