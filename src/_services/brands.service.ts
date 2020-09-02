import {
  Injectable,

} from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import * as path from './http.url';

@Injectable()
export class BrandsService {

  constructor( private httpClient: HttpClient) { }
  setenrollBrand(data: any) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',

      }),
      responseType: 'text' as 'json'
    };
    return this.httpClient.post(
      path.url + 'brandsEnroll', data , options
    );
  }


  public getEnc(orderId) {
    return this.httpClient.get(

      path.url + `ccAvenueEncBrandsSignup?order_id=` + orderId,
    {
      responseType: 'text'
    }
    );
  }
}
