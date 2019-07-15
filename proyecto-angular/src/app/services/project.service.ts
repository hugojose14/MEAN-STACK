import { Injectable } from "@angular/core";
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Project} from '../models/project';
import {Global} from './global'

@Injectable()
export class ProjectService{
    public url:string;

    constructor(
        private _http: HttpClient
    ){
        this.url  = Global.url;

    }

    testService(){
        return "Probando el servicio angular"
    }
    //guardar un nuevo elemento (projecto) en la base de datos
    saveProject(project:Project): Observable<any>{
        //datos a guardar en nuestro backend
        let params = JSON.stringify(project);
        //establecer nuestras cabeceras(como se va a guardar nuestra informacion)
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.post(this.url+'save-project',params,{headers:headers});
    }
}
