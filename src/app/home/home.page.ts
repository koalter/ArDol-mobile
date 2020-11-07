import { Component } from '@angular/core';
import { Criterio } from '../models/Criterio';
import { Dinero } from '../models/Dinero';
import { ExchangeRateService } from '../services/exchange-rate.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  title = 'ArDol';
  exchangeRates: string[];
  criterio: Criterio;
  start: boolean;
  country: string;
  valor: any;
  dinero: Dinero;
  txtCriterio: string;

  constructor(public exchangeRateService: ExchangeRateService) {}

  ngOnInit() {
    this.dinero = new Dinero();
    this.criterio = new Criterio();
    
    this.exchangeRateService.getRates().subscribe(rates => {
      this.exchangeRates = rates.currencies_alternatives;
    });
  }

  cambiarModo(country: string): void {
    this.start = true;
    this.valor = '';
    this.dinero.resetValues();
    this.country = country;

    switch (this.country) {
      case 'US':
        this.criterio['oficial'] = parseInt(this.exchangeRates['ar_oficial_sell']);
        this.criterio['solidario'] = parseInt(this.exchangeRates['ar_oficial_sell']) * 1.65;
        this.criterio['blue'] = parseInt(this.exchangeRates['ar_blue_sell']); 
        this.txtCriterio = 'Dolares a Pesos';
        break;
      case 'AR':
        this.criterio['oficial'] = 1/parseInt(this.exchangeRates['ar_oficial_sell']);
        this.criterio['solidario'] = 1/(parseInt(this.exchangeRates['ar_oficial_sell']) * 1.65);
        this.criterio['blue'] = 1/parseInt(this.exchangeRates['ar_blue_sell']);
        this.txtCriterio = 'Pesos a Dolares';
        break;
    }
  }

  convertir(): void {
    this.dinero.setValor(this.valor);
    this.dinero.setOficial(this.criterio['oficial']);
    this.dinero.setSolidario(this.criterio['solidario']);
    this.dinero.setBlue(this.criterio['blue']);
  }

}
