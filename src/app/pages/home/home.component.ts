import { Component } from '@angular/core';
import { MenuOfTheDayComponent } from '../../components/menu-of-the-day/menu-of-the-day.component';
import { AllMenusComponent } from '../../components/all-menus/all-menus.component';
import { AllItemsComponent } from '../../components/all-items/all-items.component';

@Component({
  selector: 'app-home',
  imports: [MenuOfTheDayComponent, AllMenusComponent, AllItemsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
