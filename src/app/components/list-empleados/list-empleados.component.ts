import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {

  empleados: any[] = [];

  items: Observable<any[]>;
  constructor(private _empleadoService: EmpleadoService, private toast: ToastrService) { 
    // inicializando items de tipo observable con 
    // this.items = firestore.collection('items').valueChanges();
  }

  ngOnInit(): void {
    this.getEmpleados()
  }

  getEmpleados(){
    // Utilizamos el sercicio inyectado
    this._empleadoService.getEmpleados().subscribe( data => {
       this.empleados = [];
       data.forEach((elemento: any) => {
        //  console.log(elemento.payload.doc.data())
        this.empleados.push({
           id: elemento.payload.doc.id,
           ...elemento.payload.doc.data()
          }
        )
       });
       console.log(this.empleados)
     } )
  }

  eliminarEmpleado(id){
    this._empleadoService.eliminarEmpleado(id).then( () => {
      this.toast.success('Usuario eliminado', 'Confirmación', {
        positionClass: 'toast-bottom-right'
      })
    } ).catch( error => {
      console.error(error);
    })
    }
  

}
