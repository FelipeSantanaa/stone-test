import { Component, Output } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { Router } from '@angular/router';
import { SharedService } from '../../service/shared.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule ,HeaderComponent],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css',
})
export class ResultComponent {
  valorOriginal!: number;
  valor!: number;
  iof!: number;
  taxa!: number;
  dolar!: number;

  constructor(private route: Router, private sharedService: SharedService) {}

  ngOnInit() {
    this.sharedService.valorOriginal$.subscribe((valorOriginal) => (this.valorOriginal = valorOriginal));
    this.sharedService.valor$.subscribe((valor) => (this.valor = valor));
    this.sharedService.iof$.subscribe((iof) => (this.iof = iof));
    this.sharedService.taxa$.subscribe((taxa) => (this.taxa = taxa));
    this.sharedService.dolar$.subscribe((dolar => this.dolar = Math.round(dolar * 100) / 100));
    console.log('valorOriginal', this.valorOriginal);
    console.log('valor', this.valor);
    console.log('iof', this.iof);
    console.log('taxa', this.taxa);
    console.log('dolar', this.dolar);

  }

  backToHome() {
    this.route.navigate(['']);
  }
}
