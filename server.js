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

app.get("/api/users/new", (req, res) => {
  res.json(new Usuario());
});
app.get("/api/companies/new", (req, res) => {
  res.json(new Empresa());
});
app.get("/api/user/companies/new", (req, res) => {
  res.json([new Empresa(), new Usuario()]);
});

app.listen(port, ()=>console.log(`Escuchando el puerto ${port}`))
