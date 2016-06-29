# TP_3 para materia Aplicaciones Web de la UNPSJB

MEAN STACK

Desarrolle una aplicación web para consulta de libros en una librería.

  a) El diseño debe ser responsivo, con un estilo visual apropiado y profesional.

  b) La librería debe poseer un nombre de fantasía y un logo acorde. Puede ser una librería general o temática (ecología, política, deportes, etc).

  Debe utilizar una arquitectura Cliente /Servidor basada en servicios web donde:

  a) Cliente: deberá ser capaz de consultar por un libro, su precio local, la información general del libro (datos como el autor, la portada, la editorial,
     rankings externos, etc). El desarrollo debe ser en Angular.JS.

     El usuario puede opinar sobre el libro basado en un esquema de emoticones al estilo de las reacciones de Facebook. 
     Puede definir las que desee, pero deben expresar la opinión del visitante si ha leído el libro, y si no debe incluir una “No me interesa este libro”, o “Espero leer este libro en algún momento”.
  
  b) Servidor: se encargará de buscar el libro en la Base de Datos local y el resto de la información la obtendrá conectándose con algún servicio web como Google Books, Open Library o Amazon. Luego integrará los datos y los entregará al Cliente. Utilizará Node.JS+Express.
  
El servidor debe definir un API REST para que el cliente pueda comunicarse con él, y de esta forma mantener separación de responsabilidades entre las dos partes.

  c) Base de Datos: contendrá los datos mínimos de los libros (por ejemplo, el ISBN o el título, el resto lo obtiene de la web. Debe decidir un balance adecuado), los precios locales y las reacciones a cada libro. Se implementará en MongoDB.
