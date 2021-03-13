import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// exportando service
export class EmpleadoService {

  constructor( private  firestore: AngularFirestore ) { }

  agregarEmpleado (empleado: any ): Promise<any>{
    return this.firestore.collection('empleados').add(empleado)
  }


  getEmpleados(): Observable<any>{
    // los cambios se actualizan en timepo rela con snaphot...
    return this.firestore.collection('empleados').snapshotChanges()
  }

  eliminarEmpleado(id: string): Promise<any> {
    return this.firestore.collection('empleados').doc(id).delete();
  }

  getEmpleado(id: string): Observable<any> {
    return this.firestore.collection('empleados').doc(id).snapshotChanges()
  }

  actualizarEmpleado(id: string, data: any): Promise<any>{
    return this.firestore.collection('empleados').doc(id).update(data)
  }
}
