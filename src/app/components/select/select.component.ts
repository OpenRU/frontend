import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-select',
  imports: [
    MatSelectModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    CommonModule,
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent {
  @Input()
  options: string[] = [];
  @Input()
  selected: string = '';
  @Input()
  placeholder: string = '';
  @Input()
  control!: FormControl;
  @Input()
  labelOption: string = '';
  @Input()
  label: string = '';

  @Output()
  selectedChange = new EventEmitter<string>();

  onChange(): void {
    this.selectedChange.emit(this.selected);
  }
}
