import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private valorOriginalSource = new BehaviorSubject<number>(0);
  private valorSource = new BehaviorSubject<number>(0);
  private iofSource = new BehaviorSubject<number>(0);
  private taxaSource = new BehaviorSubject<number>(0);
  private dolarSource = new BehaviorSubject<number>(0);

  valorOriginal$ = this.valorOriginalSource.asObservable();
  valor$ = this.valorSource.asObservable();
  iof$ = this.iofSource.asObservable();
  taxa$ = this.taxaSource.asObservable();
  dolar$ = this.dolarSource.asObservable();

  constructor() { }

  setValorOriginal(valorOriginal: number) {
    this.valorOriginalSource.next(valorOriginal);
  }

  setValor(valor: number) {
    this.valorSource.next(valor);
  }

  setIof(iof: number) {
    this.iofSource.next(iof);
  }

  setTaxa(taxa: number) {
    this.taxaSource.next(taxa);
  }

  setDolar(dolar: number) {
    this.dolarSource.next(dolar);
  }
  
}
