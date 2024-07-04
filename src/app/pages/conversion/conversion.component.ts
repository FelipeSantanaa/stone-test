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
import { SharedService } from '../../service/shared.service';

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

  constructor(private router: Router, private moedaService: MoedaService, private sharedService: SharedService) {
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

  calculateValor() {
    if (this.form.valid) {
      const valorEmDolar = this.form.get('valor')?.value;
      const taxaDoEstado = this.form.get('taxaDoEstado')?.value;
      const tipoDeCompra = this.form.get('tipoDeCompra')?.value;
      this.dolar = this.moedaReturn?.bid || 0;

      this.sharedService.setValorOriginal(valorEmDolar);

      if (valorEmDolar && taxaDoEstado && tipoDeCompra && this.dolar) {
        const valorComImpostoEstado = this.calcularValorComImpostoEstado(valorEmDolar, taxaDoEstado);

        if (tipoDeCompra === 'dinheiro') {
          this.valor = this.calcularValorComDinheiro(valorComImpostoEstado, this.dolar, this.iofMoney);
        } else if (tipoDeCompra === 'cartao') {
          this.valor = this.calcularValorComCartao(valorComImpostoEstado, valorEmDolar, this.dolar, this.iofCard);
        }

        this.sharedService.setValor(this.valor);
        this.sharedService.setIof(tipoDeCompra === 'dinheiro' ? this.iofMoney : this.iofCard);
        this.sharedService.setTaxa(taxaDoEstado);
        this.sharedService.setDolar(this.dolar);

      } else {
        console.error('Valores do formulário estão faltando');
      }
    } else {
      console.error('Formulário inválido');
    }
  }

  private calcularValorComImpostoEstado(valorEmDolar: number, taxaDoEstado: number): number {
    return valorEmDolar + (valorEmDolar * (taxaDoEstado / 100));
  }

  private calcularValorComDinheiro(valorComImpostoEstado: number, dolar: number, iofMoney: number): number {
    return valorComImpostoEstado * (dolar + (dolar * (iofMoney / 100)));
  }

  private calcularValorComCartao(valorComImpostoEstado: number, valorEmDolar: number, dolar: number, iofCard: number): number {
    const valorComiofCard = valorComImpostoEstado + (valorEmDolar * (iofCard / 100));
    return valorComiofCard * dolar;
  }



  // calculateValor() {
  //   const valorEmDolar = this.form.get('valor')?.value;
  //   const taxaDoEstado = this.form.get('taxaDoEstado')?.value;
  //   const tipoDeCompra = this.form.get('tipoDeCompra')?.value;
  //   this.dolar = this.moedaReturn?.bid;
    
  //   if (this.form.valid) {
  //     console.log(tipoDeCompra)
  
  //     if (tipoDeCompra === 'dinheiro') {
  //       // [(Valor em dólar) + (imposto do Estado)] x (valor do dólar + IOF da compra de dólar)
  //       const valorComImpostoEstado = valorEmDolar + (valorEmDolar * (taxaDoEstado / 100));
  //       this.valor = valorComImpostoEstado * (this.dolar + (this.dolar * (this.iofMoney / 100)));
  //       console.log('Valor final com dinheiro', this.valor);
  
  //     } else if (tipoDeCompra === 'cartao') {
  //       // [(Valor em dólar) + (imposto do Estado) + (IOF de transações internacionais)] x (valor do dólar)
  //       const valorComImpostoEstado = valorEmDolar + (valorEmDolar * (taxaDoEstado / 100));
  //       const valorComiofCard = valorComImpostoEstado + (valorEmDolar * (this.iofCard / 100));
  //       this.valor = valorComiofCard * this.dolar;
  //       console.log('Valor final com cartão',this.valor);
  //     }
  //   } else {
  //     // Formulário inválido - pode adicionar lógica de tratamento de erro aqui
  //     console.error('Formulário inválido');
  //   }
  // }

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
