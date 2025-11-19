import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ad-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ad-form.html',
  styleUrls: ['./ad-form.css']
})
export class AdFormComponent {

  @Input() form!: FormGroup;
  @Input() isSaving = false;
  @Input() isEditMode = false;

  @Output() submitForm = new EventEmitter<void>();

  onSubmit(): void {
    if (this.form.invalid || this.isSaving) {
      return;
    }
    this.submitForm.emit();
  }
}
