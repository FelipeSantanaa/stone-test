import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../../components/header/header.component';

import { MoedaService } from '../../service/moeda.service';

import { moedaInterface } from '../../interface/moeda-interface';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@Component({
  selector: 'app-conversion',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ReactiveFormsModule, CurrencyMaskModule],
  templateUrl: './conversion.component.html',
  styleUrl: './conversion.component.css',
})
export class ConversionComponent {
  form!: FormGroup;
  valor: number = 0;
  taxaDoEstado: number = 8.87;
  dolar!: any;
  moedaReturn?: moedaInterface;
  iofMoney: number = 1.1;
  iofCard: number = 6.4;

  constructor(private router: Router, private moedaService: MoedaService) {
    this.form = new FormGroup({
      valor: new FormControl('', [Validators.required, Validators.min(0)]),
      taxaDoEstado: new FormControl('', [
        Validators.required,
        Validators.min(0),
      ]),
      tipoDeCompra: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.getDolar();
  }

  calculateValor(){
    if (this.form.valid) {
      const valor = this.form.get('valor')?.value;
      const taxaDoEstado = this.form.get('taxaDoEstado')?.value;
      const tipoDeCompra = this.form.get('tipoDeCompra')?.value;
      this.dolar = this.moedaReturn?.bid;
      console.log(valor, taxaDoEstado, tipoDeCompra, this.dolar);
      if (tipoDeCompra === 'dinheiro') {
        this.valor = valor * this.dolar;
      } else {
        this.valor = valor * this.dolar;
        this.valor = this.valor + this.valor * (taxaDoEstado / 100);
      }
    } else {
    }
  
  }

  onSubmit() {
    this.calculateValor();
    this.router.navigate(['/result']);
  }

  getDolar() {
    this.moedaService.getDolar().subscribe((data: any) => {
      this.moedaReturn = data.USDBRL;
      console.log(this.moedaReturn);
    });
  }
}
