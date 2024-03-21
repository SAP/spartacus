import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Review } from "@spartacus/core";
import { LLMMessageRequestPayloadType, LLMPromptRequestPayloadType } from "./product-review-types";
import { Observable, map } from "rxjs";
//import { BTPLLMContext } from "@sap/llm-commons";
//import { BTPLLMProxyClient } from "@sap/llm-commons/client/btp";

@Injectable({
    providedIn: 'root',
  })
export class ProductReviewSummarizerService {

    llmProxyUrl = 'https://azure-openai-serv-i057149.cfapps.sap.hana.ondemand.com/api/v1/completions';
    btpClientId = 'sb-34907351-c23b-4323-b5be-b65e5445f93f%21b121340%7Cazure-openai-service-i057149-xs%21b16730';
    llmAuthUrl = `https://productreviews-mzxry1kf.authentication.sap.hana.ondemand.com/oauth/token?clientId=${this.btpClientId}&grant_type=client_credentials`;

    promptPayload: LLMPromptRequestPayloadType = {
        prompt: "Summarize reviews in bullet points",
        n: 1,
        deployment_id: "text-davinci-003",
        temperature: 0.1,
        max_tokens: 500
    };

    REVIEWS_PLACE_HOLDER = "REVIEWS_PLACE_HOLDER";
    messagePayload: LLMMessageRequestPayloadType = {
        messages: [
            {role: "system", content: "You are an assistant designed to summarize text."},
            {role: "user", content: `The following JSON document contains a list of product reviews (negative and positive). Please write me a single review that works as a summary of the list. The result should be formatted as a bullet point list with not more than 5 items. Also highlight important keywords and format as HTML. The list of reviews: [${this.REVIEWS_PLACE_HOLDER}]`}
        ],
        n: 1,
        deployment_id: "gpt-35-turbo",
        temperature: 0.5,
        max_tokens: 500
    };

    token = '';

    constructor(
        protected http: HttpClient,
        //protected btpllmProxy: BTPLLMProxyClient
      ) {
        /*
        from(BTPLLMContext.init({
            oauthClientId: "<CLIENT_ID>",
            oauthClientSecret: "<CLIENT_SECRET>",
            oauthTokenUrl: "<AUTH_URL>", // the Auth URL ending `ondemand.com`
            llmProxyBaseUrl: "<BASE_URL>", // the service URL ending `ondemand.com`
          })).subscribe();
          */
      }

    /*
    private getAuthToken(): string {
        let token = '';
        this.http.post(this.llmAuthUrl, {}, {
            headers: {
                Authorization: 'Basic x',
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).subscribe((response)=> {
            token = JSON.parse(JSON.stringify(response)).access_token;
        });
        return token;
    }*/

    summarizeReviews(reviews: Review[]): Observable<string|undefined> {
        if (reviews.length > 0){
            let reviewComments = reviews.map((r) => r.comment);
            this.messagePayload.messages[1].content = this.messagePayload.messages[1].content.replace(this.REVIEWS_PLACE_HOLDER, reviewComments.toString().substring(0, 250))
        }
        return this.http.post(`${this.llmProxyUrl}`, JSON.stringify(this.messagePayload), {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                    "Content-Type": "application/json"
                },
            }).pipe(
                map((response) => {
                //let res = JSON.parse(JSON.stringify(response)).choices[0].text;
                let res = JSON.parse(JSON.stringify(response)).choices[0].message.content || '';
                res = res.replaceAll("\n", "<br>");
                return res;
                })
            );
    }

    /*
    summarizeReviewsWithBtpClient(reviews: Review[]): Observable<string> {
        console.log(`summarizing ${reviews}`);
        return from(this.btpllmProxy.createTextCompletion({
            deployment_id: "gpt-35-turbo",
            prompt: "Summarize reviews in bullet points.",
          })).pipe(
            map((res)=> res.choices[0].text)
            );
    }*/

}
