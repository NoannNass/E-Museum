import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from "./main/main.component";
import { BoxComponent } from "./box/box.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainComponent, BoxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'E-Museum';
}
