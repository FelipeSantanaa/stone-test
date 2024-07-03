import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent {
  @Output() valorCalculo!: number;
  @Output() taxa!: number;
  @Output() currentDolar!: number;

}
