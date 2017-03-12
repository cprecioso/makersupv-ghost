# Arquitectura del paquete Ghost

Este repositorio incluye Ghost como una dependencia en [package.json](../package.json), de forma que sea más fácil de actualizar. Ghost se puede usar como un _middleware_ de `express`, pero en este caso [se usa por sí mismo](../index.js).

Se incluye la carpeta [content](../content) y sus subcarpetas ya que es donde Ghost guarda todos los datos:

  - **[apps](../content/apps)**  
    No se utiliza aún en esta versión de Ghost. Contiene un archivo vacío para que Git la incluya.

  - **[data](../content/apps)**  
    En esta carpeta Ghost guarda la base de datos SQLite con todos los posts.
  
  - **[images](../content/images)**  
    Se guardan las imágenes de los posts.
  
  - **[themes](../content/themes)**  
    Aquí se guardan los temas que se usan en la página. Actualmente contiene dos carpetas especiales.
      - **casper** - es un enlace simbólico al tema por defecto de Ghost
      - **makersupv** - es un submódulo de Git que señala al repositorio donde se desarrolla el tema

Se incluye un archivo [start.sh](../start.sh) que es el que ejecuta systemd.

También se usa un archivo [yarn.lock](../yarn.lock) para tener dependencias deterministas.

Por último se incluye un archivo [.nvmrc](../.nvmrc) para indicar el Node.js que debe usarse con este paquete.
