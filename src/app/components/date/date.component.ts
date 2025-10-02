import { Component, Input } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-date',
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
],
  templateUrl: './date.component.html',
  styleUrl: './date.component.scss',
})
export class DateComponent {
  @Input()
  control!: FormControl;
  @Input()
  label: string = 'Escolha uma data';
  @Input()
  minDate?: Date;
  @Input()
  maxDate?: Date;
}
