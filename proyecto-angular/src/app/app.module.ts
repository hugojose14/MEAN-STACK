import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//importando modulos http y formularios
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
//importanto rutas
import {routing,appRoutingProviders} from './app.routing';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateComponent } from './components/create/create.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorComponent } from './components/error/error.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ProjectsComponent,
    CreateComponent,
    ContactComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //lo agregamos en el imports porque es un modulo
    routing, 
    HttpClientModule,
    FormsModule
  ],
  providers: [
    //como es un servicio lo cargamos aquí
    appRoutingProviders
  ],
  bootstrap: [AppComponent],
  

})
export class AppModule { }
