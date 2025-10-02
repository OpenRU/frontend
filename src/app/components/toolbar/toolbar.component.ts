import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { ButtonComponent } from "../button/button.component";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-toolbar',
  imports: [
    MatIconModule,
    MatDividerModule,
    MatToolbarModule,
    MatMenuModule,
    MatBadgeModule,
    MatButtonModule,
    RouterLink,
    HeaderComponent,
    ButtonComponent
],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  logout(): void {
    this.router.navigate(['/login']);
    this.authService.logout();
  }
}
