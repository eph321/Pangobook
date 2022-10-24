import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roleColor'
})
export class RoleColorPipe implements PipeTransform {

  transform(role: string): string {
    let color: string;
    switch (role) {
      case "Guerrier":
        color = "red lighten-1";
        break;
      case "Enchanteur":
        color = "blue lighten-1";
        break;
      case "Alchimiste":
        color = "green lighten-1";
        break;
      case "Espion":
        color = "brown lighten-1";
        break;
      case "Sorcier":
        color = 'deep-purple darken-2';
        break;
      default:
        color = 'grey';
        break;
    }
    return 'chip ' + color;
  }

}
