import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { getInputErrorMessage } from '../../utils/input-error-messages';

@Component({
  selector: 'app-input',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input()
  placeholder: string = '';
  @Input()
  type: string = '';
  @Input()
  control!: FormControl;
  @Input()
  icon: string = '';
  @Input()
  label: string = '';

  get showError(): boolean {
    return this.control?.invalid && this.control.touched;
  }

  get errorText(): string | null {
    return this.showError ? getInputErrorMessage(this.control.errors) : null;
  }
}
