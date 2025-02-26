
// configura la conexión
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://grupo-01:grupo01@cursadanodejs.ls9ii.mongodb.net/Node-js')
.then(() => console.log('Conexion exitosa a MongoDB'))
.catch(error => console.error('Error al conectar a MongoDB:' , error));

//define esquema de modelos para superheroes
 const superheroSchema = new mongoose.Schema({
    nombreSuperHeroe: { type: String, required: true },
    nombreReal: { type: String, required: true},
    edad: { type: Number, min: 0 },
    planetaOrigen: {type: String, default: 'Desconocido' },
    debilidad: String,
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    createdAt: { type: Date, default: Date.now },
        creador: String
 }, {collection: 'Grupo-01'});

 const SuperHero = mongoose.model('SuperHero', superheroSchema);

 // define metodo CRUD

 //función insertar
 async function insertSuperHero() {
    const hero = new SuperHero({
      "nombreSuperHeroe": "Spiderman",
      "nombreReal": "Peter Parker",
      "edad": 25,
      "planetaOrigen": "Tierra",
      "debilidad": "Radioactiva",
      "poderes": ["Trepar paredes", "Sentido arácnido", "Super fuerza"],
      "aliados": ["Ironman"],
      "enemigos": ["Duende Verde"],
        "creador": "Isaias"
   });
    await hero.save();
    console.log('Superheroe insertado:', hero);
 }

 insertSuperHero();

 //función actualizar documento
 async function updateSuperHero(nombreSuperHeroe) {
    const result = await SuperHero.updateOne(
        { nombreSuperHeroe: nombreSuperHeroe },
        { $set: { edad: 26 } }
    );
    console.log('Resultado de la actualización:', result);
 }

 updateSuperHero('Spiderman');

//función eliminar documento
 async function deleteSuperHero(nombreSuperHeroe) {
    const result = await SuperHero.deleteOne({nombreSuperHeroe: nombreSuperHeroe});
    console.log('Superhéroe eliminado:', result);
 }

 deleteSuperHero('Spiderman');

//función buscar
 async function findSuperHeroes() {
    const heroes = await SuperHero.find({ planetaOrigen: 'Tierra'});
    console.log('Superhéroes encontrados:', heroes);
 }

 findSuperHeroes();