import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { StockService } from '../../services/stock.service';
import { Items } from '../../models/stock/items.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarHelper } from '../../utils/snackbar-helper';

@Component({
  selector: 'app-all-items',
  imports: [CardComponent, CommonModule],
  templateUrl: './all-items.component.html',
  styleUrl: './all-items.component.scss',
})
export class AllItemsComponent implements OnInit {
  data$: Items[] = [];
  srcImage: string = 'assets/menu.png';

  private readonly stockService = inject(StockService);
  private readonly matSnackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.getDataItems();
  }

  getDataItems(): void {
    this.stockService.getAllItems().subscribe({
      next: (dataList) => {
        console.log('DADOS RECEBIDOS', dataList);
        this.data$ = dataList;
      },
      error: () => {},
    });
  }

  deleteItems(id: number): void {
    this.stockService.deleteItems(id).subscribe({
      next: () => {
        this.data$ = this.data$.filter(i => i.id !== id);
        SnackBarHelper.showMessage(this.matSnackBar, 'Item deletado com sucesso.');
      },
       error: (error: HttpErrorResponse) => {
        SnackBarHelper.showMessage(this.matSnackBar, error.message, 1000);
      },
    })
  }
}
