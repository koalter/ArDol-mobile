import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {

  constructor(public http: HttpClient) {}

  public getRates(): Observable<any> {
    return this.http.get('https://www.currency-calc.com/currencies_rates.json');
  }
}
