import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from "./main/main.component";
import { StartScreenComponent } from "./start-screen/start-screen.component";
import { VikingMainComponent } from "./viking-main/viking-main.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainComponent, StartScreenComponent, VikingMainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'E-Museum';
}
