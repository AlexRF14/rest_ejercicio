const express = require('express');
const app = express();
app.use(express.json());

// Datos de ejemplo
let peliculas = [
    { id: 1, titulo: "La Guerra de las Galaxias", duracion: 120, clasificacion: "Apta para todo público", genero: "Ciencia Ficción" },
    { id: 2, titulo: "El Señor de los Anillos", duracion: 180, clasificacion: "Apta para mayores de 13", genero: "Aventura" }
];

let sesiones = [
    { id: 1, pelicula_id: 1, fecha: "2026-03-05T18:00:00", sala: "Sala 1", precio: 10 },
    { id: 2, pelicula_id: 2, fecha: "2026-03-06T20:00:00", sala: "Sala 2", precio: 12 }
];

app.get('/peliculas', (req, res) => {
    res.json(peliculas);
});

app.get('/peliculas/:id', (req, res) => {
    const pelicula = peliculas.find(p => p.id === parseInt(req.params.id));
    if (!pelicula) return res.status(404).send({ error: "Película no encontrada" });
    res.json(pelicula);
});

app.post('/peliculas', (req, res) => {
    const nuevaPelicula = req.body;
    nuevaPelicula.id = peliculas.length + 1;
    peliculas.push(nuevaPelicula);
    res.status(201).json(nuevaPelicula);
});

app.get('/sesiones', (req, res) => {
    res.json(sesiones);
});

app.get('/peliculas/:id/sesiones', (req, res) => {
    const sesionesPelicula = sesiones.filter(s => s.pelicula_id === parseInt(req.params.id));
    res.json(sesionesPelicula);
});

app.post('/peliculas/:id/sesiones', (req, res) => {
    const nuevaSesion = req.body;
    nuevaSesion.id = sesiones.length + 1;
    nuevaSesion.pelicula_id = parseInt(req.params.id);
    sesiones.push(nuevaSesion);
    res.status(201).json(nuevaSesion);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});