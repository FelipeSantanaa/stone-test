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

@Component({
  selector: 'app-conversion',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ReactiveFormsModule],
  templateUrl: './conversion.component.html',
  styleUrl: './conversion.component.css',
})
export class ConversionComponent {
  form!: FormGroup;
  valor!: number;
  taxaDoEstado!: number;
  areInputsValid: boolean = true;
  moedaReturn?: moedaInterface;

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

  onSubmit() {
    this.router.navigate(['/result']);
  }

  getDolar() {
    this.moedaService.getDolar().subscribe((data: any) => {
      this.moedaReturn = data.USDBRL;
      console.log(this.moedaReturn);
    });
  }
}
