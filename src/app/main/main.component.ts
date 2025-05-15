import { Component } from '@angular/core';
import { BoxComponent } from '../box/box.component';
import { ArmorComponent } from "../armor/armor.component";
import { SwordComponent } from "../sword/sword.component";
import { HelmetComponent } from "../helmet/helmet.component";
import { VikingBoatComponent } from '../viking-boat/viking-boat.component';
import { VikingCasqueComponent } from '../viking-casque/viking-casque.component';
import { VikingComponent } from '../viking/viking.component';
import { VikingSwordComponent } from '../viking-sword/viking-sword.component';
import { SuggestionFormComponent } from '../suggestion-form/suggestion-form.component';

@Component({
  selector: 'app-main',
  imports: [
    BoxComponent, 
    ArmorComponent, 
    SwordComponent, 
    HelmetComponent, 
    VikingBoatComponent, 
    VikingCasqueComponent, 
    VikingComponent, 
    VikingSwordComponent,
    SuggestionFormComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  switchTheme(){
    const RomanDisplay = document.querySelector(".main");
    const cards = document.querySelectorAll(".card");

    if (RomanDisplay) {
      console.log("click");
      RomanDisplay.classList.add("active");
      setTimeout(() => {
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth",
        })
        RomanDisplay.classList.add("despawn");
        cards.forEach(card => {
          if (card instanceof HTMLElement) {
            card.classList.add("active");
          }
        });
      }, 200);
    }

  }

}
