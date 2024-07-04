import { Component, Output } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent {
  @Output() valorCalculo!: number;
  @Output() taxa!: number;
  @Output() currentDolar!: number;

  constructor(
    private route: Router
  ){

  }

  ngOnInit(){

  }

  backToHome(){
    this.route.navigate(['']);
  }

}
