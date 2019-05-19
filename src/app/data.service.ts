import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ubicaciones } from './ubicaciones';
import { idNames } from './idsnames';

@Injectable({
  providedIn: 'root'
})
export class DataService {

baseUrl = 'http://localhost:1234?idUrl=';

  constructor(private httpClient: HttpClient) { }


  async getDataFromMesa(mesaNumber) {
    const mesa = ubicaciones.filter((ubic) => ubic.descripcion_ubicacion === mesaNumber);
    const idurl = mesa[0].id_ubicacion.split('.').join('/');
    const urlToObtain = this.baseUrl + idurl;
    let mesaApiData = await this.httpClient.get(urlToObtain).toPromise();
    const establecimiento = mesa[0].ancestros[mesa[0].ancestros.length - 2];
    const nombresLocalidades = mesa[0].ancestros.map((ances) => idNames[ances]);
    const nombreEstablecimiento = nombresLocalidades[nombresLocalidades.length - 2];
    const nombreLocalidad = nombresLocalidades[nombresLocalidades.length - 3];
    const nombreDepartamento = nombresLocalidades[nombresLocalidades.length - 4];
    mesaApiData = { ...mesaApiData, nombreEstablecimiento, nombreLocalidad, nombreDepartamento };
    const establecimientoUrl = establecimiento.split('.').join('/');
    let establecimientoApiData = await this.httpClient.get(this.baseUrl + establecimientoUrl).toPromise();
    return { mesaApiData, establecimientoApiData }
  }

}

