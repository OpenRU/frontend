import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { AuthService } from './services/auth.service';
import { ProgressBarComponent } from "./components/progress-bar/progress-bar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToolbarComponent, ProgressBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isLoginPage(): boolean {
    return this.router.url === '/login' || this.router.url === '/register';
  }
}
