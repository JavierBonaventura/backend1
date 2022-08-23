class Usuario {
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [libros];
        this.mascotas = [mascotas];
    }
    getFullName(){
        return `${this.nombre} ${this.apellido}`;
    }
    addMascota(nuevaMascota){
        this.mascotas.push(nuevaMascota);
    }
    countMascotas(){
        return this.mascotas.length;
    }
    addBook(nombre, autor){
        this.libros.push({nombre, autor});
    }
    getBookNames(){
        return this.libros.map(libro => libro.nombre);
    }
}

const usuario = new Usuario ("Javier", "Bonaventura", {nombre: "El señor de los Anillos"}, "Perra")


//Muestra el nombre del usuario
console.log(usuario.getFullName())

//Agrega dos mascotas al array de mascotas
usuario.addMascota("Gato")
usuario.addMascota("Loro")

//Cuenta la cantidad de mascotas en el array de mascotas
console.log(usuario.countMascotas())

//Agrega dos libros en el array de libros
usuario.addBook("Cien años de soledad", "Gabriel García Márquez")
usuario.addBook("Orgullo y prejuicio", "Jane Austen")

//Muestra solo el nombre del array de libros
console.log(usuario.getBookNames())
