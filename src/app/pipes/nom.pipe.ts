import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'companyname'
})
export class NomPipe implements PipeTransform {

  transform(value:any, companyname:any):any {
    if(companyname==null){
      return value;
    }else{
      return value.filter((item:any)=>(item.companyname.includes(companyname)));
    }
  }

}
