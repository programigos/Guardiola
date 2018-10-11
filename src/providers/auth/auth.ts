import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  private db: SQLiteObject;
  private isOpen: boolean;

  constructor(public http: HttpClient, private storage: SQLite) {
    console.log('Hello AuthProvider Provider');
    if(!this.isOpen){
      this.storage = new SQLite();
      this.storage.create({
        name: "guardiola.db",
        location: "default"
      }).then((db:SQLiteObject)=>{
        this.db = db;
        db.executeSql("CREATE TABLE IF NOT EXIST usuarios (id_usuario INTEGER AUTOINCREMENT PRIMARY KEY, nombre VARCHAR, email VARCHAR UNIQUE, fecha_nacimiento DATE, password VARCHAR)",[]);
        db.executeSql("CREATE TABLE IF NOT EXIST grupos (id_grupo INTEGER AUTOINCREMENT PRIMARY KEY, codigo VARCHAR UNIQUE, creador_email VARCHAR ,FOREIGN KEY (creador_id) REFERENCES usuarios (id_usuario))",[]);        
        db.executeSql("CREATE TABLE IF NOT EXIST usuarios_grupos (usuario_id INTEGER PRIMARY KEY, grupo_id INTEGER PRIMARY KEY, FOREIGN KEY (usuario_id) REFERENCES usuarios (id_usuario), FOREIGN KEY(grupo_id) REFERENCES grupos (id_grupo))",[]);
        db.executeSql("CREATE TABLE IF NOT EXIST categorias (id_categoria INTEGER PRIMARY KEY, nombre VARCHAR)",[]);
        db.executeSql("CREATE TABLE IF NOT EXIST gastos_ingresos (id_concepto INTEGER AUTOINCREMENTAL PRIMARY KEY, usuario_id INTEGER, grupo_id INTEGER, categoria INTEGER, descripcion TEXT, monto NUMERIC, fecha DATE, gasto_ingreso BOOLEAN, FOREIGN KEY (usuario_id) REFERENCES usuarios (id_usuario), FOREIGN KEY (grupo_id) REFERENCES grupos (id_grupo), FOREIGN KEY (categoria) REFERENCES categorias (id_categoria))",[]);
        db.executeSql("CREATE TABLE IF NOT EXIST ahorros (id_ahorro INTEGER AUTOINCREMENT PRIMARY KEY, usuario_id INTEGER, grupo_id INTEGER, monto_objetivo NUMERIC, personal_grupal BOOLEAN, FOREIGN KEY (usuario_id) REFERENCES usuarios (id_usuario), FOREIGN KEY (grupo_id) REFERENCES grupos (id_grupo))",[]);
        db.executeSql("CREATE TABLE IF NOT EXIST recuerdos (id_recuerdo INTENGER PRIMARY KEY, usuario_id INTEGER, grupo_id INTEGER, categoria INTEGER, periodicidad TIMESTAMP, descripcion TEXT, monto NUMERIC, FOREIGN KEY (usuario_id) REFERENCES usuarios (id_usuario), FOREIGN KEY (grupo_id) REFERENCES grupos (id_grupo), FOREIGN KEY (categoria) REFERENCES categorias (id_categoria)",[]);
        this.isOpen = true;
        console.log('Base de datos creada');
      },(err)=>{
        console.log(err);
      }).catch((error) => {
        console.log(error)
      })
    }
  }

}
