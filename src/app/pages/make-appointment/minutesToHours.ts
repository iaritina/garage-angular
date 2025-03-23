import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationToHours',
})
export class MinutesToHours implements PipeTransform {
  transform(duration: number): string {
    const hours = Math.floor(duration / 60); // Nombre d'heures
    const minutes = duration % 60; // Reste des minutes

    return `${hours}h ${minutes}m`; // Formatage en heures et minutes
  }
}
