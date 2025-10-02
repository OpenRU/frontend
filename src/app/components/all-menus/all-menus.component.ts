import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MenuService } from '../../services/menu.service';
import { Menu } from '../../models/menu/menu.model';
import { CommonModule } from '@angular/common';
import { CardComponent } from "../card/card.component";
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarHelper } from '../../utils/snackbar-helper';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-all-menus',
  imports: [MatCardModule, CommonModule, CardComponent],
  templateUrl: './all-menus.component.html',
  styleUrl: './all-menus.component.scss'
})
export class AllMenusComponent implements OnInit {
  data$: Menu[] = [];
  srcImage: string = 'assets/menu.png';

  private readonly menuService = inject(MenuService);
  private readonly matSnackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.getDataMenu();
  }

  getDataMenu(): void {
    this.menuService.getAllMenus().subscribe({
      next: (dataList) => {
        this.data$ = dataList;
      },
      error: (error) => {
        console.log('ERRO', error);
      }
    });
  }

  deleteMenu(id: number): void {
    this.menuService.deleteMenu(id).subscribe({
      next: () => {
        this.data$ = this.data$.filter(m => m.id !== id);
        SnackBarHelper.showMessage(this.matSnackBar, 'Cardápio excluído com sucesso.', 1000);
      },
      error: (error: HttpErrorResponse) => {
        SnackBarHelper.showMessage(this.matSnackBar, `${error.message}`, 1000);
      }
    })
  }
}
