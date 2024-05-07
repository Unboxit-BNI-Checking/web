import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tweets',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tweets.component.html',
  styleUrl: './tweets.component.css'
})
export class TweetsComponent {

}
