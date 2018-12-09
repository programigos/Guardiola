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
        db.executeSql("CREATE TABLE IF NOT EXISTS usuarios (id_usuario INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR, email VARCHAR UNIQUE, fecha_nacimiento DATE, telefono NUMBER, password VARCHAR, saldo NUMBER)",[]);
        db.executeSql("CREATE TABLE IF NOT EXISTS grupos (id_grupo INTEGER PRIMARY KEY AUTOINCREMENT, codigo VARCHAR UNIQUE, nombre VARCHAR, creador_id INTEGER, FOREIGN KEY (creador_id) REFERENCES usuarios (id_usuario))",[]);
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

  registerUser(nombre:string, email:string, fecha_nacimiento:string, telefono: number, password:string, saldo:number){
    return new Promise ((resolve, reject) =>{
      let sql = "INSERT INTO usuarios (nombre, email, fecha_nacimiento, telefono, password, saldo) VALUES (?,?,?,?,?,?)";
      this.db.executeSql(sql,[nombre, email, fecha_nacimiento, telefono, password, saldo]).then((data)=>{
        console.log("Usuario creado");
        console.log(data);
        resolve(data);
      },(err)=>{
        reject(err);
      }).catch((error)=>{
        reject(error);
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
            telefono: data.rows.item(i).telefono,
            saldo: data.rows.item(i).saldo
          })
        }
        resolve(arrayUsers);
      },(err)=>{
        reject(err);
      }).catch((error)=>{
        reject(error);
      })
    })
  }

  createGroup(usuario_id: number, codigo: string, name: string){
    return new Promise((resolve, reject) =>{
      let sql = "INSERT INTO grupos (codigo, nombre, creador_id) VALUES (?,?,?)";
      this.db.executeSql(sql,[codigo, name, usuario_id]).then((data)=>{
        console.log("Group Created");
        this.addUserGroup(usuario_id, data.insertId);
        resolve(data.insertId);
      },(err)=>{
        reject(err);
      }).catch((error)=>{
        reject(error);
      })
    })
  }

  addUserGroup(usuario_id: number, grupo_id: number){
    return new Promise((resolve, reject) =>{
      let sql = "INSERT INTO usuarios_grupos (usuario_id, grupo_id) VALUES (?,?)";
      this.db.executeSql(sql,[usuario_id, grupo_id]).then((data)=>{
        console.log("User Added");
        console.log(data);
        resolve(data);
      },(err)=>{
        reject(err);
      }).catch((error)=>{
        reject(error);
      })
    })
  }
  
  addUserGroupCode(usuario_id: number, codigo: string){
    return new Promise((resolve, reject) =>{
      let sql = "SELECT * FROM grupos WHERE codigo = ?";
      this.db.executeSql(sql,[codigo]).then((data)=>{
        if(data.rows.length == 0){
          resolve("Grupo no Encontrado");
        }
        else{
          this.addUserGroup(usuario_id, data.rows.item(0).id_grupo);
          resolve(data.rows.item(0).id_grupo);
        }
      },(err)=>{
        reject(err);
      }).catch((error)=>{
        reject(error);
      })
    })
  }

  dropUserGroup(usuario_id: number, group_id: number, is_creator: boolean){
    return new Promise((resolve, reject) =>{
      if(is_creator){
        let sql = "DELETE FROM usuarios_grupos WHERE grupo_id = ?";
        this.db.executeSql(sql,[group_id]).then((data)=>{
          let sql2= "DELETE FROM grupos WHERE id_grupo = ?";
          this.db.executeSql(sql2,[group_id]);
          resolve(data);
        },(err)=>{
          reject(err);
        }).catch((error)=>{
          reject(error);
        })
      }
      else{
        let sql = "DELETE FROM usuarios_grupos WHERE usuario_id = ? AND grupo_id = ?";
        this.db.executeSql(sql,[usuario_id, group_id]).then((data)=>{
          resolve(data);
        },(err)=>{
          reject(err);
        }).catch((error)=>{
          reject(error);
        })
      }
    })
  }

  getUserGroup(usuario_id: number){
    return new Promise((resolve, reject) =>{
      let sql = "SELECT * FROM usuarios_grupos WHERE usuario_id = ?";
      this.db.executeSql(sql,[usuario_id]).then((data)=>{
        let groupArray = [];
        for(var i = 0; i < data.rows.length; ++i){
          groupArray.push({
            group_id: data.rows.item(i).grupo_id
          })
        }
        resolve(groupArray);
      },(err)=>{
        reject(err);
      }).catch((error)=>{
        reject(error);
      })
    })
  }

  getGroupInfo(group_id: number){
    return new Promise((resolve, reject) =>{
      let sql = "SELECT * FROM grupos WHERE id_grupo = ?";
      this.db.executeSql(sql,[group_id]).then((data)=>{
        let groupArray = [];
        for(var i = 0; i < data.rows.length; ++i){
          groupArray.push({
            group_id: data.rows.item(i).id_grupo,
            codigo: data.rows.item(i).codigo,
            nombre: data.rows.item(i).nombre,
            creador_id: data.rows.item(i).creador_id
          })
        }
        resolve(groupArray);
      },(err)=>{
        reject(err);
      }).catch((error)=>{
        reject(error);
      })
    })
  }

  getCreatorGroup(usuario_id: number){
    console.log("ID Creador");
    console.log(usuario_id);
    return new Promise((resolve, reject) =>{
      let sql = "SELECT * FROM usuarios WHERE id_usuario = ?";
      this.db.executeSql(sql,[usuario_id]).then((data)=>{
        let userArray = [];
        for(var i = 0; i < data.rows.length; ++i){
          userArray.push({
            id: data.rows.item(i).id_usuario,
            nombre: data.rows.item(i).nombre,
            email: data.rows.item(i).email,
            fecha: data.rows.item(i).fecha_nacimiento,
            telefono: data.rows.item(i).telefono
          })
        }
        resolve(userArray);
      },(err)=>{
        reject(err);
      }).catch((error)=>{
        reject(error);
      })
    })
  }

  getListUsersGroup(group_id: number){
    return new Promise((resolve, reject) =>{
      let sql = "SELECT * FROM usuarios_grupos INNER JOIN usuarios ON usuarios.id_usuario = usuarios_grupos.usuario_id WHERE usuarios_grupos.grupo_id = ?";
      this.db.executeSql(sql,[group_id]).then((data)=>{
        console.log("Entre a la lista de usuarios");
        let userArray = [];
        for(var i = 0; i < data.rows.length; ++i){
          userArray.push({
            id: data.rows.item(i).id_usuario,
            nombre: data.rows.item(i).nombre,
            email: data.rows.item(i).email,
            fecha: data.rows.item(i).fecha_nacimiento,
            telefono: data.rows.item(i).telefono
          })
        }
        resolve(userArray);
      },(err)=>{
        console.log(err);
        reject(err);
      }).catch((error)=>{
        console.log(error);
        reject(error);
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
      }).catch((error)=>{
        reject(error);
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
      }).catch((error)=>{
        reject(error);
      })
    })
  }

  getUserDay(id,date:string){
    return new Promise((resolve, reject) =>{
      let sql = "SELECT SUM(monto) Suma, id_categoria, nombre FROM gastos_ingresos INNER JOIN categorias ON categoria=id_categoria WHERE usuario_id= ? AND fecha= ? GROUP BY id_categoria, nombre ORDER BY id_categoria";
      this.db.executeSql(sql,[id,date]).then((data)=>{
        let saves=[];
        for(var i = 0; i < data.rows.length; ++i){
          saves.push({
            id: data.rows.item(i).id_categoria,
            category: data.rows.item(i).nombre,
            amount:data.rows.item(i).Suma,
            incomes:[]
          })
        }
        resolve(saves);
      },(err)=>{
        reject(err);
      })
    })
  }
  getUserDayCategory(user_id,date:string,category_id){
    return new Promise((resolve, reject) =>{
      let sql = "SELECT descripcion,monto, fecha FROM gastos_ingresos WHERE usuario_id=? AND fecha=? AND categoria=? ORDER BY id_concepto";
      this.db.executeSql(sql,[user_id,date,category_id]).then((data)=>{
        let saves=[];
        for(var i = 0; i < data.rows.length; ++i){
          saves.push({
            description: data.rows.item(i).descripcion,
            amount:data.rows.item(i).monto,
            date:data.rows.item(i).fecha
          })
        }
        resolve(saves);
      },(err)=>{
        reject(err);
      })
    })
  }
  getUserMonth(id,month){
    return new Promise((resolve, reject) =>{
      let base="";
      let top="";
      if(Number(month)<12){
        if(Number(month)<10){
          base="2018-0"+month+"-01";
          top="2018-0"+(Number(month)+1)+"-01";
        }
        else{
          base="2018-"+month+"-01";
          top="2018-"+(Number(month)+1)+"-01";
        }
      }
      else{
        base="2018-12-01";
        top="2019-01-01";
      }
      console.log(base);
      console.log(top);
      let sql = "SELECT SUM(monto) Suma, id_categoria, nombre FROM gastos_ingresos INNER JOIN categorias ON categoria=id_categoria WHERE usuario_id= ? AND fecha>= ? AND fecha< ? GROUP BY id_categoria, nombre ORDER BY id_categoria";
      this.db.executeSql(sql,[id,base,top]).then((data)=>{
        let saves=[];
        for(var i = 0; i < data.rows.length; ++i){
          saves.push({
            id: data.rows.item(i).id_categoria,
            category: data.rows.item(i).nombre,
            amount:data.rows.item(i).Suma,
            incomes:[]
          })
        }
        resolve(saves);
      },(err)=>{
        reject(err);
      })
    })
  }
  getUserMonthCategory(user_id,month,category_id){
    let base="";
      let top="";
      if(Number(month)<12){
        if(Number(month)<10){
          base="2018-0"+month+"-01";
          top="2018-0"+(Number(month)+1)+"-01";
        }
        else{
          base="2018-"+month+"-01";
          top="2018-"+(Number(month)+1)+"-01";
        }
      }
      else{
        base="2018-12-01";
        top="2019-01-01";
      }
    return new Promise((resolve, reject) =>{
      let sql = "SELECT descripcion,monto, fecha FROM gastos_ingresos WHERE usuario_id=? AND fecha>= ? AND fecha< ? AND categoria=? ORDER BY id_concepto";
      this.db.executeSql(sql,[user_id,base,top,category_id]).then((data)=>{
        let saves=[];
        for(var i = 0; i < data.rows.length; ++i){
          saves.push({
            description: data.rows.item(i).descripcion,
            amount:data.rows.item(i).monto,
            date:data.rows.item(i).fecha
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

  getUserYear(id,year){
    return new Promise((resolve, reject) =>{
      let base=year+"-01-01";
      let top=(Number(year)+1)+"-01-01";
      let sql = "SELECT SUM(monto) Suma, id_categoria, nombre FROM gastos_ingresos INNER JOIN categorias ON categoria=id_categoria WHERE usuario_id= ? AND fecha>= ? AND fecha< ? GROUP BY id_categoria, nombre ORDER BY id_categoria";
      this.db.executeSql(sql,[id,base,top]).then((data)=>{
        let saves=[];
        for(var i = 0; i < data.rows.length; ++i){
          saves.push({
            id: data.rows.item(i).id_categoria,
            category: data.rows.item(i).nombre,
            amount:data.rows.item(i).Suma,
            incomes:[]
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
  getUserYearCategory(user_id,year,category_id){
    let base=year+"-01-01";
      let top=(Number(year)+1)+"-01-01";
    return new Promise((resolve, reject) =>{
      let sql = "SELECT descripcion,monto, fecha FROM gastos_ingresos WHERE usuario_id=? AND fecha>= ? AND fecha< ? AND categoria=? ORDER BY id_concepto";
      this.db.executeSql(sql,[user_id,base,top,category_id]).then((data)=>{
        let saves=[];
        for(var i = 0; i < data.rows.length; ++i){
          saves.push({
            description: data.rows.item(i).descripcion,
            amount:data.rows.item(i).monto,
            date:data.rows.item(i).fecha
          })
        }
        console.log("Expenses and Incomes");
        console.log(saves);
        resolve(saves);
      },(err)=>{
        reject(err);
      }).catch((error)=>{
        reject(error);
      })
    })
  }

  getGroupDay(id,date:string){
    return new Promise((resolve, reject) =>{
      let sql = "SELECT SUM(monto) Suma, id_categoria, nombre FROM gastos_ingresos INNER JOIN categorias ON categoria=id_categoria WHERE grupo_id= ? AND fecha= ? GROUP BY id_categoria, nombre ORDER BY id_categoria";
      this.db.executeSql(sql,[id,date]).then((data)=>{
        let saves=[];
        for(var i = 0; i < data.rows.length; ++i){
          saves.push({
            id: data.rows.item(i).id_categoria,
            category: data.rows.item(i).nombre,
            amount:data.rows.item(i).Suma,
            incomes:[]
          })
        }
        resolve(saves);
      },(err)=>{
        reject(err);
      })
    })
  }
  getGroupDayCategory(user_id,date:string,category_id){
    return new Promise((resolve, reject) =>{
      let sql = "SELECT descripcion,monto, fecha FROM gastos_ingresos WHERE grupo_id=? AND fecha=? AND categoria=? ORDER BY id_concepto";
      this.db.executeSql(sql,[user_id,date,category_id]).then((data)=>{
        let saves=[];
        for(var i = 0; i < data.rows.length; ++i){
          saves.push({
            description: data.rows.item(i).descripcion,
            amount:data.rows.item(i).monto,
            date:data.rows.item(i).fecha
          })
        }
        resolve(saves);
      },(err)=>{
        reject(err);
      })
    })
  }
  getGroupMonth(id,month){
    return new Promise((resolve, reject) =>{
      let base="";
      let top="";
      if(Number(month)<12){
        if(Number(month)<10){
          base="2018-0"+month+"-01";
          top="2018-0"+(Number(month)+1)+"-01";
        }
        else{
          base="2018-"+month+"-01";
          top="2018-"+(Number(month)+1)+"-01";
        }
      }
      else{
        base="2018-12-01";
        top="2019-01-01";
      }
      console.log(base);
      console.log(top);
      let sql = "SELECT SUM(monto) Suma, id_categoria, nombre FROM gastos_ingresos INNER JOIN categorias ON categoria=id_categoria WHERE grupo_id= ? AND fecha>= ? AND fecha< ? GROUP BY id_categoria, nombre ORDER BY id_categoria";
      this.db.executeSql(sql,[id,base,top]).then((data)=>{
        let saves=[];
        for(var i = 0; i < data.rows.length; ++i){
          saves.push({
            id: data.rows.item(i).id_categoria,
            category: data.rows.item(i).nombre,
            amount:data.rows.item(i).Suma,
            incomes:[]
          })
        }
        resolve(saves);
      },(err)=>{
        reject(err);
      })
    })
  }
  getGroupMonthCategory(user_id,month,category_id){
    let base="";
      let top="";
      if(Number(month)<12){
        if(Number(month)<10){
          base="2018-0"+month+"-01";
          top="2018-0"+(Number(month)+1)+"-01";
        }
        else{
          base="2018-"+month+"-01";
          top="2018-"+(Number(month)+1)+"-01";
        }
      }
      else{
        base="2018-12-01";
        top="2019-01-01";
      }
    return new Promise((resolve, reject) =>{
      let sql = "SELECT descripcion,monto, fecha FROM gastos_ingresos WHERE grupo_id=? AND fecha>= ? AND fecha< ? AND categoria=? ORDER BY id_concepto";
      this.db.executeSql(sql,[user_id,base,top,category_id]).then((data)=>{
        let saves=[];
        for(var i = 0; i < data.rows.length; ++i){
          saves.push({
            description: data.rows.item(i).descripcion,
            amount:data.rows.item(i).monto,
            date:data.rows.item(i).fecha
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

  getGroupYear(id,year){
    return new Promise((resolve, reject) =>{
      let base=year+"-01-01";
      let top=(Number(year)+1)+"-01-01";
      let sql = "SELECT SUM(monto) Suma, id_categoria, nombre FROM gastos_ingresos INNER JOIN categorias ON categoria=id_categoria WHERE grupo_id= ? AND fecha>= ? AND fecha< ? GROUP BY id_categoria, nombre ORDER BY id_categoria";
      this.db.executeSql(sql,[id,base,top]).then((data)=>{
        let saves=[];
        for(var i = 0; i < data.rows.length; ++i){
          saves.push({
            id: data.rows.item(i).id_categoria,
            category: data.rows.item(i).nombre,
            amount:data.rows.item(i).Suma,
            incomes:[]
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
  getGroupYearCategory(user_id,year,category_id){
    let base=year+"-01-01";
      let top=(Number(year)+1)+"-01-01";
    return new Promise((resolve, reject) =>{
      let sql = "SELECT descripcion,monto, fecha FROM gastos_ingresos WHERE grupo_id=? AND fecha>= ? AND fecha< ? AND categoria=? ORDER BY id_concepto";
      this.db.executeSql(sql,[user_id,base,top,category_id]).then((data)=>{
        let saves=[];
        for(var i = 0; i < data.rows.length; ++i){
          saves.push({
            description: data.rows.item(i).descripcion,
            amount:data.rows.item(i).monto,
            date:data.rows.item(i).fecha
          })
        }
        console.log("Expenses and Incomes");
        console.log(saves);
        resolve(saves);
      },(err)=>{
        reject(err);
      }).catch((error)=>{
        reject(error);
      })
    })
  }

  editUser(nombre:string, fecha_nacimiento:string, telefono:number, id){
    return new Promise((resolve, reject)=>{
      let sql = "UPDATE usuarios SET nombre = ?, fecha_nacimiento = ?, telefono = ? WHERE id_usuario = ?";
      this.db.executeSql(sql,[nombre, fecha_nacimiento, telefono, id]).then((data)=>{
        resolve(data);
      },(err)=>{
        reject(err);
      }).catch((error)=>{
        reject(error);
      })
    })
  }

  editPassword(new_password:string, id){
    return new Promise((resolve, reject)=>{
      let sql = "UPDATE usuarios SET password = ? WHERE id_usuario = ?";
      this.db.executeSql(sql,[new_password, id]).then((data)=>{
        resolve(data);
      },(err)=>{
        reject(err);
      }).catch((error)=>{
        reject(error);
      })
    })
  }

  getPassword(id){
    return new Promise((resolve, reject) =>{
      let sql = "SELECT * FROM usuarios WHERE id_usuario = ?";
      this.db.executeSql(sql,[id]).then((data)=>{
        resolve(data.rows.item(0).password);
      },(err)=>{
        reject(err);
      }).catch((error)=>{
        reject(error);
      })
    })
  }


}
