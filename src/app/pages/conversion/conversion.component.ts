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
  imports: [
    CommonModule,
    HeaderComponent,
    ReactiveFormsModule,
    CurrencyMaskModule,
  ],
  templateUrl: './conversion.component.html',
  styleUrl: './conversion.component.css',
})
export class ConversionComponent {
  form!: FormGroup;
  valor: any = 0;
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

// Calcular o valor com imposto do estado
// private calculateValueStateTax(valorEmDolar: number, taxaDoEstado: number): number {
//   return valorEmDolar + (valorEmDolar * (taxaDoEstado / 100));
// }

// Calcular o valor total para compra com dinheiro
// private calculateValueMoney(valorComImpostoEstado: any, dolar: any, iofMoney: any): any {
//   console.log(valorComImpostoEstado, dolar, iofMoney);
//   console.log(valorComImpostoEstado * (dolar + (dolar * (iofMoney / 100))));
//   return valorComImpostoEstado * (dolar + (dolar * (iofMoney / 100)));
// }

// Calcular o valor total para compra com cartão
// private calculateValueCard(valorComImpostoEstado: number, valorEmDolar: number, dolar: number, iofCartao: number): number {
//   const valorComIofCartao = valorComImpostoEstado + (valorEmDolar * (iofCartao / 100));
//   return valorComIofCartao * dolar;
// }

// calculateValor() {
//   if (this.form.valid) {
//     const valorEmDolar = this.form.get('valor')?.value;
//     const taxaDoEstado = this.form.get('taxaDoEstado')?.value;
//     const tipoDeCompra = this.form.get('tipoDeCompra')?.value;
//     this.dolar = this.moedaReturn?.bid;

//     const valorComImpostoEstado = this.calculateValueStateTax(valorEmDolar, taxaDoEstado);

//     if (tipoDeCompra === 'dinheiro') {
//       this.valor = this.calculateValueMoney(valorComImpostoEstado, this.dolar, this.iofMoney);
//     } else if (tipoDeCompra === 'cartao') {
//       this.valor = this.calculateValueCard(valorComImpostoEstado, valorEmDolar, this.dolar, this.iofCard);
//     }

//     console.log(this.valor);
//   } else {
//     console.error('Formulário inválido');
//   }
// }


  calculateValor() {
    const valorEmDolar = this.form.get('valor')?.value;
    const taxaDoEstado = this.form.get('taxaDoEstado')?.value;
    const tipoDeCompra = this.form.get('tipoDeCompra')?.value;
    this.dolar = this.moedaReturn?.bid;
    
    if (this.form.valid) {
      console.log(tipoDeCompra)
  
      if (tipoDeCompra === 'dinheiro') {
        // [(Valor em dólar) + (imposto do Estado)] x (valor do dólar + IOF da compra de dólar)
        const valorComImpostoEstado = valorEmDolar + (valorEmDolar * (taxaDoEstado / 100));
        this.valor = valorComImpostoEstado * (this.dolar + (this.dolar * (this.iofMoney / 100)));
        console.log('Valor final com dinheiro', this.valor);
  
      } else if (tipoDeCompra === 'cartao') {
        // [(Valor em dólar) + (imposto do Estado) + (IOF de transações internacionais)] x (valor do dólar)
        const valorComImpostoEstado = valorEmDolar + (valorEmDolar * (taxaDoEstado / 100));
        const valorComIofCartao = valorComImpostoEstado + (valorEmDolar * (this.iofCard / 100));
        this.valor = valorComIofCartao * this.dolar;
        console.log('Valor final com cartão',this.valor);
      }
    } else {
      // Formulário inválido - pode adicionar lógica de tratamento de erro aqui
      console.error('Formulário inválido');
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
