import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StockService } from '../../services/stock.service';
import { ButtonComponent } from '../../components/button/button.component';
import { InputComponent } from '../../components/input/input.component';
import { SelectComponent } from "../../components/select/select.component";
import { MeasurementUnitEnum } from '../../enums/measurement-unit.enum';
import { SnackBarHelper } from '../../utils/snackbar-helper';
import { SectionComponent } from "../../components/section/section.component";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-items',
  imports: [ReactiveFormsModule, ButtonComponent, InputComponent, SelectComponent, SectionComponent],
  templateUrl: './create-items.component.html',
  styleUrl: './create-items.component.scss'
})
export class CreateItemsComponent implements OnInit {
  itemsForm!: FormGroup;
  itemSelected: string = '';
  weightItem = [
    'KILOGRAM',
    'GRAM',
    'MILLIGRAM',
    'MILLILITER',
    'LITER',
    'UNIT',
    'TABLESPOON',
    'TEASPOON',
    'CUP',
  ];
 
  private readonly fb = inject(FormBuilder);
  private readonly stockService = inject(StockService);
  private readonly matSnackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.itemsForm = this.fb.group({
      name: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      measurementUnit: [null as MeasurementUnitEnum | null, [Validators.required]],
      supplier: ['', [Validators.required]],
    });
  }
  
  get name(): FormControl {
    return this.itemsForm.get('name') as FormControl;
  }

  get quantity(): FormControl {
    return this.itemsForm.get('quantity') as FormControl;
  }

  get measurementUnit(): FormControl {
    return this.itemsForm.get('measurementUnit') as FormControl;
  }

  get supplier(): FormControl {
    return this.itemsForm.get('supplier') as FormControl;
  }

  onSubmit(): void {
    if (this.itemsForm.invalid) {
      return;
    }

    const items = this.itemsForm.value;

    this.stockService.createItems(items).subscribe({
      next: () => {
        this.itemsForm.reset();
        SnackBarHelper.showMessage(this.matSnackBar, 'Items criado com sucesso.');
      },
      error: (error: HttpErrorResponse) => {
        console.log('ERRO CRIAR ITEMS', error);
      },
    });
  }
}
