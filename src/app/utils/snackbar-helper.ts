import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

export class SnackBarHelper {
  static showMessage(snackBar: MatSnackBar, message: string, duration: number = 2000): void {
    const config: MatSnackBarConfig = {
      duration,
    };
    snackBar.open(message, 'Fechar', config);
  }
}
