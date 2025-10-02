import { Component, inject, OnInit } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { Menu } from '../../models/menu/menu.model';
import { MenuService } from '../../services/menu.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarHelper } from '../../utils/snackbar-helper';
import { PrefixDatePipe } from '../../pipes/date.pipe';

@Component({
  selector: 'app-menu-of-the-day',
  imports: [ButtonComponent, ButtonComponent, PrefixDatePipe],
  templateUrl: './menu-of-the-day.component.html',
  styleUrl: './menu-of-the-day.component.scss'
})
export class MenuOfTheDayComponent implements OnInit {
  data$: Menu | null = null;

  private readonly menuService = inject(MenuService);
  private readonly matSnackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.getMenuToday();
  }

  getMenuToday(): void {
    this.menuService.getMenuToday().subscribe({
      next: (menu) => {
        this.data$ = menu;
      },
      error: () => {}
    });
  }

  onClick(): void {
    SnackBarHelper.showMessage(this.matSnackBar, 'Pedido feito com sucesso.');
  }
}
