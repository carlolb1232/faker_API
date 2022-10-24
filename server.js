const { faker } = require('@faker-js/faker');

const express = require("express");
const app = express();
const port = 8000;


class Usuario{
  constructor(){
    this._id=faker.datatype.uuid();
    this.primer_nombre=faker.name.firstName();
    this.apellido=faker.name.lastName();
    this.telefono=faker.phone.number();
    this.email=faker.internet.email();
    this.password=faker.internet.password();
  }
}

class Empresa{
  constructor(){
    this._id=faker.datatype.uuid();
    this.nombre=faker.company.companyName();
    this.direccion={
      calle:faker.address.streetAddress(),
      ciudad:faker.address.cityName(),
      estado:faker.address.state(),
      codigo_postal:faker.address.zipCode(),
      pais:faker.address.country(),
    };
  }
}

// ARREGLO PARA ALMACENAR A LOS USUARIOS 
const users = [];
// ARREGLO PARA ALMACENAR A LAS EMPRESAS 
const companies = [];

// CREAR USUARIO
app.post("/api/users/new", (req, res) => {
  const newUser = new Usuario();
  users.push(newUser);
  res.json(
    {
      message: "Nuevo usuario creado.", 
      newUser,
    }
  );
});
// CREAR EMPRESA
app.post("/api/companies/new", (req, res) => {
  const newCompanie = new Empresa();
  companies.push(newCompanie);
  res.json(
    {
      message: "Nueva empresa creada", 
      newCompanie,
    }
  );
});
// CREAR EMPRESA Y USUARIO
app.post("/api/user/companies/new", (req, res) => {
  const newUser = new Usuario();
  users.push(newUser);
  const newCompanie = new Empresa();
  companies.push(newCompanie);
  res.json(
    {
      message:"Empresa y usuario creados", 
      creaciones:[
        {
          message: "Empresa creada", 
          newCompanie,
        }, 
        {
          message:"Usuario creado", 
          newUser,
        }
      ]
    }
  );
});

// OBTENER TODOS LOS USUARIOS
app.get("/api/users", (req, res) =>{
  res.json({Usuarios:users})
})
// OBTENER TODAS LA EMPRESAS
app.get("/api/companies", (req, res) =>{
  res.json({Empresas:companies})
})

app.listen(port, ()=>console.log(`Escuchando el puerto ${port}`))
