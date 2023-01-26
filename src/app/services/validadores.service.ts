import { Injectable } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {
  constructor() { 

  }

  noSerrano( control:FormControl):{[s:string]:boolean}{
    if(control.value?.toLowerCase()==='serrano'){
      return{
        noSerrano:true
      }
    }
    return null;
  }

  passwordsIguales(pass1Name :any, pass2Name:any){
    
    return (formGroup: FormGroup) => {
      const pass1Control= formGroup.controls[pass1Name];
      const pass2Control= formGroup.controls[pass2Name];
      if(pass1Control.value===pass2Control.value){
        pass2Control.setErrors(null);
      }
      else{
        pass2Control.setErrors({noEsIgual:true});
      }
    }
  }

  existeUsuario(control:FormControl): Promise<any> | Observable<any>{
    if(!control.value){
      return Promise.resolve(null);
    }
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        if(control.value==='strider'){
          resolve({existe:true})
        }
        else{
          resolve(null)
        }
      }, 3500)
    })
  }
}
