import { Component } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [
    MatProgressBar
  ],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {

}
