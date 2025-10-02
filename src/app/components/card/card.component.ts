import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PrefixDatePipe } from '../../pipes/date.pipe';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-card',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    PrefixDatePipe,
    MatDividerModule,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input()
  srcImage: string = '';
  @Input()
  altImage: string = '';
  @Input()
  title: string = '';
  @Input()
  subtitle: string = '';
  @Input()
  text: string = '';
  @Input()
  textTwo: string = '';
  @Input()
  textThree: string = '';
  @Input()
  textDate: string = '';

  @Output()
  edit = new EventEmitter<void>();
  @Output()
  delete = new EventEmitter<void>();

  editMenu(): void {
    this.edit.emit();
  }

  deleteMenu(): void {
    this.delete.emit();
  }
}
