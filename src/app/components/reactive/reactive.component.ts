import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';
@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html'
})
export class ReactiveComponent implements OnInit{
  forma!: FormGroup
  
  constructor(private fb:FormBuilder,private validadores:ValidadoresService){
    this.crearFormulario();
    this.cargarDataAlFormulario();
    this.crearListener();
  }
  crearListener() {
    this.forma.valueChanges.subscribe(valor=>{
      console.log(valor);
    });
    this.forma.statusChanges.subscribe(status=>{
      console.log(status);
    });
  }
  
  ngOnInit():void{

  }
  get pasatiempos(){
    return this.forma.get('pasatiempos') as FormArray;
  }
  agregarPasatiempo(){
    this.pasatiempos.push(this.fb.control('Nuevo elemento',  Validators.required));
  }
  borrarPasatiempo(i:number){
    this.pasatiempos.removeAt(i)
  }
  crearFormulario() {
    this.forma = this.fb.group({
      nombre:    ['', [Validators.required, Validators.minLength(5)]],
      apellido:  ['', [Validators.required, Validators.minLength(5), this.validadores.noSerrano]],
      correo:    ['', [Validators.required, Validators.pattern('[a-z0-9._%+1]+@[a-z0-9._%+1]+\.[a-z]{2,3}$')]],
      pass1:  ['',Validators.required],
      pass2:  ['', Validators.required],
      usuario:  ['',  ,this.validadores.existeUsuario],
      direccion:this.fb.group({
        poblacion:  ['',Validators.required],
        provincia:  ['', Validators.required]
      }),
      pasatiempos: this.fb.array([])
    }),{
      validators: this.validadores.passwordsIguales('pass1','pass2')
  };
  }
  guardar(){
    console.log(this.forma)
    if(this.forma.invalid){
      return Object.values(this.forma.controls).forEach(control=>{
        if(control instanceof FormGroup){
          Object.values(control.controls).forEach((control)=>
            control.markAsTouched()
          );
        }
        else{
          control.markAsTouched();
        }
      });
    }
    this.forma.reset();
  }
  get nombreNoValido(){
    return this.forma.get('nombre')?.invalid && this.forma.get('nombre')?.touched
  }
  get apellidoNoValido(){
    return this.forma.get('apellido')?.invalid && this.forma.get('apellido')?.touched
  }
  get correoNoValido(){
    return this.forma.get('correo')?.invalid && this.forma.get('correo')?.touched
  }
  get poblacionNoValido(){
    return this.forma.get('direccion.poblacion')?.invalid && this.forma.get('direccion.poblacion')?.touched
  }
  get provinciaNoValido(){
    return this.forma.get('direccion.provincia')?.invalid && this.forma.get('direccion.provincia')?.touched
  }
  get pass1NoValido(){
    return this.forma.get('pass1')?.invalid && this.forma.get('pass1').touched
  }
  get pass2NoValido(){
    const pass1=this.forma.get('pass1');
    const pass2=this.forma.get('pass2');

    return (pass1===pass2) ? false : true;
  }
  get usuarioNoValido(){
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched
  }
  cargarDataAlFormulario() {
    this.forma.reset({
      nombre:'Txema',
      apellido:'Serrano',
      correo:'jsersan@gmail.com',
      pass1:'123',
      pass2:'123',
      usuario:'Txema',
      direccion:{
        poblacion:'Arrasate',
        provincia:'Gipuzkoa'
      }
    });
  }
}
