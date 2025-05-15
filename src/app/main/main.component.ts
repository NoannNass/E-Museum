import { Component } from '@angular/core';
import { BoxComponent } from '../box/box.component';
import { ArmorComponent } from "../armor/armor.component";
import { SwordComponent } from "../sword/sword.component";
import { HelmetComponent } from "../helmet/helmet.component";
@Component({
  selector: 'app-main',
  imports: [BoxComponent, ArmorComponent, SwordComponent, HelmetComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  switchTheme(){
    const RomanDisplay = document.querySelector(".main");

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
      }, 200);
    }
  }

}
