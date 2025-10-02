import { Component, inject } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProgressBarService } from '../../services/progress-bar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-bar',
  imports: [MatProgressBarModule, CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
})
export class ProgressBarComponent {
  readonly progressBarService = inject(ProgressBarService);
}
