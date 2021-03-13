// import
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,FormControl, Validators } from '@angular/forms'
import { EmpleadoService } from '../../services/empleado.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

// decorador
@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.css']
})

// exportando componente
export class CreateEmpleadoComponent implements OnInit {
  // create variable
  createEmpleado: FormGroup;   
  submited = false;
  loading = false;
  id: string  | null;
  title = 'Nuevo empleado'

  // inyectando clase formbuilder para validar formulario facil
  constructor( private fb: FormBuilder, private _empleadoService: EmpleadoService, private toastr: ToastrService, private aRoute: ActivatedRoute, private router: Router ) {

    this.createEmpleado = this.fb.group({
       nombre: ['', Validators.required],
       apellido: ['', Validators.required],
       documento: ['', Validators.required],
       salario: ['', Validators.required],
    })

    // recoje el id de la url
    this.id = this.aRoute.snapshot.paramMap.get('id')
    console.log(this.id)
   }
  //  end constructor


  // Cuando se ejectute el componente
  ngOnInit(): void {
    this.esEditar()
  }



  agregarEditarEmpleado(){
    
    this.submited = true

    if (this.createEmpleado.invalid) {
      return;
    }

    if (!this.id) {
      console.log("no exits")
      this.agregarEmpleado();
    }else{
      console.log("exits")
      this.editarEmpleado(this.id);
    }


    }

    editarEmpleado(id: string){


      const empleado: any = {
        nombre: this.createEmpleado.value.nombre,
        apellido: this.createEmpleado.value.apellido,
        documento: this.createEmpleado.value.documento,
        salario: this.createEmpleado.value.salario,
        fechaActualizacion: new Date()
      }
      this._empleadoService.actualizarEmpleado(id, empleado).then( () => {
        this.toastr.info('Empleado modificado con exito', 'Empleado modificado', {
            positionClass: 'toast-bottom-right'
        })
        this.router.navigate(['/list-empleados'])
      } )
    }



    agregarEmpleado(){
      const empleado: any = {
        nombre: this.createEmpleado.value.nombre,
        apellido: this.createEmpleado.value.apellido,
        documento: this.createEmpleado.value.documento,
        salario: this.createEmpleado.value.salario,
        fechaCreacion: new Date(),
        fechaActualizacion: new Date()
  
      }
  
      console.log("Recuperendo datos:")
      console.log(empleado)
  
      this.loading = true;
      this._empleadoService.agregarEmpleado(empleado).then( () => {
        this.toastr.success('Registro creado', 'Confirmación', {
          positionClass: 'toast-bottom-right'
        });
        this.loading = false;
      } ).catch( error => {
        this.loading = false;
        console.error(error)
      })
    }

    esEditar() {
      this.title = 'Editando empleado'
      if (this.id) {
        this._empleadoService.getEmpleado(this.id).subscribe( data => {
          console.log(data)
          // relenando los campos
              this.createEmpleado.setValue({
                nombre: data.payload.data()['nombre'],
                apellido: data.payload.data()['apellido'],
                documento: data.payload.data()['documento'],
                salario: data.payload.data()['salario']
              })
        } )
      }
    }

  

}
