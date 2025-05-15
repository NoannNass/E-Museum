import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-suggestion-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './suggestion-form.component.html',
  styleUrl: './suggestion-form.component.css'
})
export class SuggestionFormComponent {
  suggestionModel = {
    modelName: '',
    description: '',
    category: '',
    era: '',
    email: ''
  };

  categories = ['Arme', 'Armure', 'Casque', 'Bateau', 'Autre'];
  eras = ['Romain', 'Viking', 'Médiéval', 'Autre'];

  onSubmit() {
    console.log('Suggestion soumise:', this.suggestionModel);
    // Ici, vous pourriez ajouter la logique pour envoyer les données à un backend
    this.resetForm();
  }

  resetForm() {
    this.suggestionModel = {
      modelName: '',
      description: '',
      category: '',
      era: '',
      email: ''
    };
  }
}
