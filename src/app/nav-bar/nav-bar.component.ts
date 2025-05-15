import { Component } from '@angular/core';
import { SuggestionFormComponent } from '../suggestion-form/suggestion-form.component';
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [SuggestionFormComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  ShowFormulaire(){
    const form = document.querySelector(".suggestion-form-container");

    if (form) {
      form.classList.toggle("active");
    }
  }

}
