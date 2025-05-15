import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from "./main/main.component";
import { StartScreenComponent } from "./start-screen/start-screen.component";
import { VikingMainComponent } from "./viking-main/viking-main.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainComponent, StartScreenComponent, VikingMainComponent, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'E-Museum';

  ngOnInit() {
    window.scroll({
      top: 0,
      left: 0,
    })
  }
}
