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
        temperature: 0.5,
        max_tokens: 500
    };

    REVIEWS_PLACE_HOLDER = "REVIEWS";
    messagePayload: LLMMessageRequestPayloadType = {
        messages: [
            {role: "system", content: "You are an assistant designed to summarize text."},
            {role: "user", content: `The following JSON document contains a list of product reviews (negative and positive). Please write me a single review that works as a summary of the list. The result should be formatted as a bullet point list with not more than 5 items. Also highlight important keywords and format as HTML. The list of reviews:[${this.REVIEWS_PLACE_HOLDER}]`}
        ],
        n: 1,
        deployment_id: "gpt-35-turbo",
        temperature: 0.5,
        max_tokens: 500
    };

    token = 'eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vcHJvZHVjdHJldmlld3MtbXp4cnkxa2YuYXV0aGVudGljYXRpb24uc2FwLmhhbmEub25kZW1hbmQuY29tL3Rva2VuX2tleXMiLCJraWQiOiJkZWZhdWx0LWp3dC1rZXktMDA1NmU1MWVjOCIsInR5cCI6IkpXVCIsImppZCI6ICJwaEN0UDZOY1c2Z0NXUVBTV1JqVFFveEFibUZITUUxVUVxa1EyL09iMG1vPSJ9.eyJqdGkiOiI4MDI1NGRhMGE3MzY0ZmRmYWQ1NzFiNzhjYWUzZDdmNiIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzdWJhY2NvdW50aWQiOiIyNjZkMzVlMC1lYTQ1LTQ4OTEtOWJlOS01YjBiNmQwM2E4NGIiLCJ6ZG4iOiJwcm9kdWN0cmV2aWV3cy1tenhyeTFrZiIsInNlcnZpY2VpbnN0YW5jZWlkIjoiMzQ5MDczNTEtYzIzYi00MzIzLWI1YmUtYjY1ZTU0NDVmOTNmIn0sInN1YiI6InNiLTM0OTA3MzUxLWMyM2ItNDMyMy1iNWJlLWI2NWU1NDQ1ZjkzZiFiMTIxMzQwfGF6dXJlLW9wZW5haS1zZXJ2aWNlLWkwNTcxNDkteHMhYjE2NzMwIiwiYXV0aG9yaXRpZXMiOlsidWFhLnJlc291cmNlIl0sInNjb3BlIjpbInVhYS5yZXNvdXJjZSJdLCJjbGllbnRfaWQiOiJzYi0zNDkwNzM1MS1jMjNiLTQzMjMtYjViZS1iNjVlNTQ0NWY5M2YhYjEyMTM0MHxhenVyZS1vcGVuYWktc2VydmljZS1pMDU3MTQ5LXhzIWIxNjczMCIsImNpZCI6InNiLTM0OTA3MzUxLWMyM2ItNDMyMy1iNWJlLWI2NWU1NDQ1ZjkzZiFiMTIxMzQwfGF6dXJlLW9wZW5haS1zZXJ2aWNlLWkwNTcxNDkteHMhYjE2NzMwIiwiYXpwIjoic2ItMzQ5MDczNTEtYzIzYi00MzIzLWI1YmUtYjY1ZTU0NDVmOTNmIWIxMjEzNDB8YXp1cmUtb3BlbmFpLXNlcnZpY2UtaTA1NzE0OS14cyFiMTY3MzAiLCJncmFudF90eXBlIjoiY2xpZW50X2NyZWRlbnRpYWxzIiwicmV2X3NpZyI6IjM1MmZiNjZlIiwiaWF0IjoxNzExMDA2NjI4LCJleHAiOjE3MTEwNDk4MjgsImlzcyI6Imh0dHBzOi8vcHJvZHVjdHJldmlld3MtbXp4cnkxa2YuYXV0aGVudGljYXRpb24uc2FwLmhhbmEub25kZW1hbmQuY29tL29hdXRoL3Rva2VuIiwiemlkIjoiMjY2ZDM1ZTAtZWE0NS00ODkxLTliZTktNWIwYjZkMDNhODRiIiwiYXVkIjpbInVhYSIsInNiLTM0OTA3MzUxLWMyM2ItNDMyMy1iNWJlLWI2NWU1NDQ1ZjkzZiFiMTIxMzQwfGF6dXJlLW9wZW5haS1zZXJ2aWNlLWkwNTcxNDkteHMhYjE2NzMwIl19.CuyCF1uqdBy1BN1qsEDeUQWN8oPllXSZAiUp6Wv_UkOKfEzyz9zKbpZFUs02xw8Cn0aXskkU-WKUtkaCQ5WFK2sLo8oReTEGSmRcf6a-les4u1A-lxzHf9lDu7JRPzWrGDm6GFDwBqdjibF2QZ6E0dNVk3LMePjf6YgD4pSnHevF2IE-yDrZyLF2QP817v8Ay2Drjyl8UBDxsCp3Gv6S_dNfUwyaGuFxrz8SnnfT2sUXx2loiidF38dVNhpZ17tiGq9RdAOjYtL9UELbO85rOz0cpbAy7PNVfftv-ji4-0oFEaCvXN-OcyzJhQQwg8V5PQG3OGcaQdBGRsAV6QtKdw';

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
                Authorization: 'Basic c2ItMzQ5MDczNTEtYzIzYi00MzIzLWI1YmUtYjY1ZTU0NDVmOTNmIWIxMjEzNDB8YXp1cmUtb3BlbmFpLXNlcnZpY2UtaTA1NzE0OS14cyFiMTY3MzA6NmYzNGE4NzMtYjJhMC00N2M0LWIzMDctNmVlY2ZlZDRiMTU4JEFkdm52eE14aGhuZk9kSFJnTE5EUzF5Z0NTTU5icFgzN0hXbHo4bzFOQzQ9',
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).subscribe((response)=> {
            token = JSON.parse(JSON.stringify(response)).access_token;
        });
        return token;
    }*/

    summarizeReviews(reviews: Review[]): Observable<string|undefined> {
        let reviewComments = reviews.map((r) => r.comment);
        this.messagePayload.messages[1].content.replace(this.REVIEWS_PLACE_HOLDER, reviewComments.toString());
        return this.http.post(`${this.llmProxyUrl}`, JSON.stringify(this.messagePayload), {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                    "Content-Type": "application/json"
                },
            }).pipe(
                map((response) => {
                //let res = JSON.parse(JSON.stringify(response)).choices[0].text;
                let res = JSON.parse(JSON.stringify(response)).choices[0].message.content;
                const parser = new DOMParser();
                const document = parser.parseFromString(res, "text/html");
                console.log(`res is ${document}`);
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
