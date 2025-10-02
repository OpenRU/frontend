import { Component, inject, OnInit } from '@angular/core';
import { InputComponent } from "../../components/input/input.component";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from "../../components/button/button.component";
import { DateComponent } from "../../components/date/date.component";
import { MenuService } from '../../services/menu.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarHelper } from '../../utils/snackbar-helper';
import { SectionComponent } from "../../components/section/section.component";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-menu',
  imports: [InputComponent, ReactiveFormsModule, ButtonComponent, DateComponent, SectionComponent],
  templateUrl: './create-menu.component.html',
  styleUrl: './create-menu.component.scss',
})
export class CreateMenuComponent implements OnInit {
  menuForm!: FormGroup;
  maxDate!: Date;

  private readonly fb = inject(FormBuilder);
  private readonly menuService = inject(MenuService);
  private readonly matSnackBar = inject(MatSnackBar);
  
  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.menuForm = this.fb.group({
      main_dish: ['', [Validators.required]],
      side_dish: ['', [Validators.required]],
      dessert: ['', [Validators.required]],
      drink: ['', [Validators.required]],
      salad: ['', [Validators.required]],
      date: ['', [Validators.required]],
    });
  }

  get main_dish(): FormControl {
    return this.menuForm.get('main_dish') as FormControl;
  }

  get side_dish(): FormControl {
    return this.menuForm.get('side_dish') as FormControl;
  }

  get dessert(): FormControl {
    return this.menuForm.get('dessert') as FormControl;
  }

  get drink(): FormControl {
    return this.menuForm.get('drink') as FormControl;
  }
  
  get salad(): FormControl {
    return this.menuForm.get('salad') as FormControl;
  }

  get date(): FormControl {
    return this.menuForm.get('date') as FormControl;
  }

  minDate(): Date {
    return new Date();
  }

  maxDatee(): Date {
    const today = new Date();
    const oneMonthLater = new Date();

    oneMonthLater.setMonth(today.getMonth() +1);

    const maxDate = this.maxDate = oneMonthLater;

    return maxDate;
  }

  onSubmit(): void {
    if (this.menuForm.invalid) {
      this.menuForm.markAllAsTouched();
      SnackBarHelper.showMessage(this.matSnackBar, "Preencha todos os campos.");
      return;
    }
    
    const dateSelected = this.menuForm.value.date;
    const dateFormated = dateSelected.toISOString().split('T')[0];

    const data = { ...this.menuForm.value, date: dateFormated };

    this.menuService.createMenu(data).subscribe({
      next: () => {
        this.menuForm.reset();
        SnackBarHelper.showMessage(this.matSnackBar, "Cadastro feito com sucesso.");
      },
      error: (error: HttpErrorResponse) => {
        SnackBarHelper.showMessage(this.matSnackBar, error.message, 2500);
      }
    });
  }
}
