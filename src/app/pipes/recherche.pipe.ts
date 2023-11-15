import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recherche'
})
export class RecherchePipe implements PipeTransform {

  transform(value: any, searchTerm: any): any {
    if(!value)return null;
    if(!searchTerm)return value;

    searchTerm = searchTerm.toLowerCase();

    return value.filter(function(data:any){
        return JSON.stringify(data).toLowerCase().includes(searchTerm);
    });
}
// transform(value: any, searchTerm: any): any {
//   if(!value)return null;
//  if(!searchTerm)return value;
  
//   return value.filter(function(search:any){
// return JSON.stringify(search).toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
//   });
// }
}
