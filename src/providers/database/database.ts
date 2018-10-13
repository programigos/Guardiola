import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

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
        db.executeSql("CREATE TABLE IF NOT EXISTS usuarios (id_usuario INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR, email VARCHAR UNIQUE, fecha_nacimiento DATE, telefono NUMBER, password VARCHAR)",[]);
        db.executeSql("CREATE TABLE IF NOT EXISTS grupos (id_grupo INTEGER PRIMARY KEY AUTOINCREMENT, codigo VARCHAR UNIQUE, creador_id INTEGER ,FOREIGN KEY (creador_id) REFERENCES usuarios (id_usuario))",[]);        
        db.executeSql("CREATE TABLE IF NOT EXISTS usuarios_grupos (usuario_grupo_id INTEGER PRIMARY KEY AUTOINCREMENT, usuario_id INTEGER, grupo_id INTEGER, FOREIGN KEY (usuario_id) REFERENCES usuarios (id_usuario), FOREIGN KEY(grupo_id) REFERENCES grupos (id_grupo))",[]);
        db.executeSql("CREATE TABLE IF NOT EXISTS categorias (id_categoria INTEGER PRIMARY KEY, nombre VARCHAR)",[]);
        db.executeSql("CREATE TABLE IF NOT EXISTS gastos_ingresos (id_concepto INTEGER PRIMARY KEY AUTOINCREMENT, usuario_id INTEGER, grupo_id INTEGER, categoria INTEGER, descripcion TEXT, monto NUMERIC, fecha DATE, gasto_ingreso BOOLEAN, FOREIGN KEY (usuario_id) REFERENCES usuarios (id_usuario), FOREIGN KEY (grupo_id) REFERENCES grupos (id_grupo), FOREIGN KEY (categoria) REFERENCES categorias (id_categoria))",[]);
        db.executeSql("CREATE TABLE IF NOT EXISTS ahorros (id_ahorro INTEGER PRIMARY KEY AUTOINCREMENT, usuario_id INTEGER, grupo_id INTEGER, monto_objetivo NUMERIC, personal_grupal BOOLEAN, FOREIGN KEY (usuario_id) REFERENCES usuarios (id_usuario), FOREIGN KEY (grupo_id) REFERENCES grupos (id_grupo))",[]);
        db.executeSql("CREATE TABLE IF NOT EXISTS recuerdos (id_recuerdo INTEGER PRIMARY KEY AUTOINCREMENT, usuario_id INTEGER, grupo_id INTEGER, categoria INTEGER, periodicidad TIMESTAMP, descripcion TEXT, monto NUMERIC, FOREIGN KEY (usuario_id) REFERENCES usuarios (id_usuario), FOREIGN KEY (grupo_id) REFERENCES grupos (id_grupo), FOREIGN KEY (categoria) REFERENCES categorias (id_categoria))",[]);
        db.executeSql("INSERT INTO categorias (nombre) VALUES ('Comida')",[]);
        db.executeSql("INSERT INTO categorias (nombre) VALUES ('Servicios y hogar')",[]);
        db.executeSql("INSERT INTO categorias (nombre) VALUES ('Entretenimiento')",[]);
        db.executeSql("INSERT INTO categorias (nombre) VALUES ('Transporte')",[]);
        db.executeSql("INSERT INTO categorias (nombre) VALUES ('Salud')",[]);
        db.executeSql("INSERT INTO categorias (nombre) VALUES ('Educación')",[]);
        db.executeSql("INSERT INTO categorias (nombre) VALUES ('Generales')",[]);
        db.executeSql("INSERT INTO categorias (nombre) VALUES ('Ingreso')",[]);
        this.isOpen = true;
        console.log('Base de datos creada');
      },(err)=>{
        console.log(err);
      }).catch((error) => {
        console.log(error)
      })
    }
  }

  registerUser(nombre:string, email:string, fecha_nacimiento:string, telefono: number, password:string){
    return new Promise ((resolve, reject) =>{
      let sql = "INSERT INTO usuarios (nombre, email, fecha_nacimiento, telefono, password) VALUES (?,?,?,?,?)";
      this.db.executeSql(sql,[nombre, email, fecha_nacimiento, telefono, password]).then((data)=>{
        console.log("Usuario creado");
        resolve(data);
      },(err)=>{
        reject(err);
      })
    })
  }

  validateUser(email:string, password:string){
    return new Promise((resolve, reject) =>{
      let sql = "SELECT * FROM usuarios WHERE email = ? and password = ?";
      this.db.executeSql(sql,[email, password]).then((data)=>{
        console.log("Ingresando...")
        let arrayUsers = [];
        for(var i = 0; i < data.rows.length; ++i){
          arrayUsers.push({
            id: data.rows.item(i).id_usuario,
            nombre: data.rows.item(i).nombre,
            email: data.rows.item(i).email,
            fecha: data.rows.item(i).fecha_nacimiento,
            telefono: data.rows.item(i).telefono
          })
        }
        resolve(arrayUsers);
      },(err)=>{
        reject(err);
      })
    })
  }

  addExpenseIncome(usuario_id: number, grupo_id: number, categoria: number, descripcion: string, monto: number, fecha: string, gasto_ingreso:boolean){
    return new Promise((resolve, reject) =>{
      let sql = "INSERT INTO gastos_ingresos (usuario_id, grupo_id, categoria, descripcion, monto, fecha, gasto_ingreso) VALUES (?,?,?,?,?,?,?)";
      this.db.executeSql(sql,[usuario_id, grupo_id, categoria, descripcion, monto, fecha, gasto_ingreso]).then((data)=>{
        console.log("Expense_Income Added");
        console.log(data);
        resolve(data);
      },(err)=>{
        reject(err);
      })
    })
  }
  getUserSave(id){
    return new Promise((resolve, reject) =>{
      let sql = "SELECT * FROM gastos_ingresos INNER JOIN categorias on categoria=id_categoria WHERE usuario_id = ? ORDER BY categoria";
      this.db.executeSql(sql,[id]).then((data)=>{
        let saves=[];
        for(var i = 0; i < data.rows.length; ++i){
          saves.push({
            id: data.rows.item(i).id_concepto,
            user: data.rows.item(i).usuario_id,
            group: data.rows.item(i).grupo_id,
            category: data.rows.item(i).nombre,
            category_id:data.rows.item(i).categoria,
            description: data.rows.item(i).descripcion,
            amount:data.rows.item(i).monto,
            date:data.rows.item(i).fecha,
            type:data.rows.item(i).gasto_ingreso
          })
        }
        console.log("Expenses and Incomes");
        console.log(saves);
        resolve(saves);
      },(err)=>{
        reject(err);
      })
    })
  }
  getUserCategory(id,category){
    return new Promise((resolve, reject) =>{
      let sql = "SELECT * FROM gastos_ingresos INNER JOIN categorias on categoria=id_categoria WHERE usuario_id = ? ORDER BY categoria";
      this.db.executeSql(sql,[id]).then((data)=>{
        let saves=[];
        for(var i = 0; i < data.rows.length; ++i){
          saves.push({
            id: data.rows.item(i).id_concepto,
            user: data.rows.item(i).usuario_id,
            group: data.rows.item(i).grupo_id,
            category: data.rows.item(i).nombre,
            category_id:data.rows.item(i).categoria,
            description: data.rows.item(i).descripcion,
            amount:data.rows.item(i).monto,
            date:data.rows.item(i).fecha,
            type:data.rows.item(i).gasto_ingreso
          })
        }
        console.log("Expenses and Incomes");
        console.log(saves);
        resolve(saves);
      },(err)=>{
        reject(err);
      })
    })
  }

  
}
