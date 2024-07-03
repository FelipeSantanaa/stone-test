import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  currentDate!: Date;
  currentHour!: string;

  constructor(){}

  ngOnInit(){
    this.getCurrentDateTime();
  }

  getCurrentDateTime() {
    this.currentDate = new Date();
    this.currentHour =  new Date().getHours() + ':' + new Date().getMinutes();
    console.log(this.currentDate);
    console.log(this.currentHour);
    
  }
}
