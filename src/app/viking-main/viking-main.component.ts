import { Component } from '@angular/core';
import { VikingComponent } from '../viking/viking.component';
import { VikingCasqueComponent } from "../viking-casque/viking-casque.component";
import { VikingSwordComponent } from "../viking-sword/viking-sword.component";
import { VikingHornComponent } from "../viking-horn/viking-horn.component";
import { VikingBoatComponent } from "../viking-boat/viking-boat.component";

@Component({
  selector: 'app-viking-main',
  imports: [VikingComponent, VikingCasqueComponent, VikingSwordComponent, VikingHornComponent, VikingBoatComponent],
  templateUrl: './viking-main.component.html',
  styleUrl: './viking-main.component.css'
})
export class VikingMainComponent {



}
