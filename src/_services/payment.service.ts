import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import * as path from './http.url';

@Injectable({
  providedIn: 'root'
})

// tslint:disable:max-line-length
export class PaymentService {

  constructor(private httpClient: HttpClient) {}

  public getEnc(amount, name, orderId) {
    return this.httpClient.get(

      path.url + `ccAvenueEnc?order_id=` + orderId
      + `&billing_name=` + name
      + `&currency=USD&amount=` + amount,
    {
      responseType: 'text'
    });
  }


  public getCredentials() {

  }

}
