import { Component } from '@angular/core';

@Component({
  selector: 'app-start-screen',
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.css'
})
export class StartScreenComponent {
  
  switchDisplay() {
    const display = document.querySelector(".startContainer");

    if (display) {
      display.classList.add("active");
    } 
  }

}
