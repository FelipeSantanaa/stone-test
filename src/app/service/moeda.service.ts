import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { moedaInterface } from '../interface/moeda-interface';

@Injectable({
  providedIn: 'root'
})
export class MoedaService {

  private baseUrl = 'https://economia.awesomeapi.com.br/last';

  constructor(
    private http: HttpClient
  ) { }

  getDolar(){
    return this.http.get<moedaInterface>(`${this.baseUrl}/USD-BRL`);
  }
}
