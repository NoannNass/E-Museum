import { Component } from '@angular/core';
import { VikingComponent } from '../viking/viking.component';
import { VikingCasqueComponent } from "../viking-casque/viking-casque.component";

@Component({
  selector: 'app-viking-main',
  imports: [VikingComponent, VikingCasqueComponent],
  templateUrl: './viking-main.component.html',
  styleUrl: './viking-main.component.css'
})
export class VikingMainComponent {

}
