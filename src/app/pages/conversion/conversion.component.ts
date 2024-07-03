import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  constructor(private router: Router) {
    this.form = new FormGroup({
      valor: new FormControl('', [Validators.required, Validators.min(0)]),
      taxaDoEstado: new FormControl('', [
        Validators.required,
        Validators.min(0),
      ]),
      tipoDeCompra: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.router.navigate(['/result']);
  }
}
