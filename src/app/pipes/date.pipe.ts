import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prefixDate',
  standalone: true,
})
export class PrefixDatePipe implements PipeTransform {
  transform(value: string, prefix: string = 'Data: '): string {
    if (!value) {
      return '';
    }

    const formatted = formatDate(value, 'dd/MM/yyyy', 'pt-BR');

    return `${prefix} ${formatted}`;
  }
}
