import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'profil'
})
export class TypePipe implements PipeTransform {

  transform(value:any, profil:any):any {
    if(profil==null){
      return value;
    }else{
      return value.filter((item:any)=>(item.profil.includes(profil)));
    }
  }

}
