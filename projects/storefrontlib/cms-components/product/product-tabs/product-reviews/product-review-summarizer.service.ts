import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Review } from "@spartacus/core";
import { RequestPayloadType } from "./product-review-types";
import { Observable, map } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
  export class ProductReviewSummarizerService {

    llmProxyUrl = 'https://azure-openai-serv-i057149.cfapps.sap.hana.ondemand.com/api/v1/completions';

    payload: RequestPayloadType = {
        prompt: "Summarize reviews in bullet points",
        n: 1,
        deployment_id: "text-davinci-003",
        temperature: 1,
        max_tokens: 500
    };

    token = '';

    constructor(
        protected http: HttpClient,
      ) {
      }

    summarizeReviews(reviews: Review[]): Observable<string|undefined> {
        console.log(`summarizing ${reviews}`);
        let res;
        return this.http.post(`${this.llmProxyUrl}`, JSON.stringify(this.payload), {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                    "Content-Type": "application/json"
                },
            }).pipe(
                map((response) => {
                res = JSON.parse(JSON.stringify(response)).choices[0].text;
                console.log(`res is ${res}`);
                return res;
                }
                ));
    }

}
