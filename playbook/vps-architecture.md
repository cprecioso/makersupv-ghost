# Arquitectura

En un VPS con Ubuntu Server conviven dos servicios, ambos gestionados mediante
`systemd`:

- **Ghost**

  Ghost es una plataforma de blogging (como WordPress) que funciona sobre
  Node.js. Se eligió debido a su absoluta facilidad de uso y de creación de
  temas.

  La parte pública de la web está disponbile en `[dominio.com]/`, mientras que
  para acceder a la parte administrativa, se debe acceder a la ruta
  `[dominio.com]/ghost/`. Ghost también tiene una aplicación que los editores
  pueden instalarse en sus ordenadores.

  En el servidor, los archivos de Ghost los podemos encontrar en
  `/var/www/ghost/`. Para más información sobre lo que hay aquí, leer el archivo
  de [Arquitectura del paquete](./pkg-architecture.md).

  Para controlar Ghost, se usan los comandos del cli de ghost, con el usuario
  `ghostsetup`:

- **Caddy**

  Caddy es un proxy inverso, que recibe las solicitudes de los navegadores de
  los usuarios y contacta con un servicio local para responderlas.

  Aunque se podría correr Node.js directamente sin ningún intermediario, Caddy
  nos da la oportunidad de comprimir las transmisiones mediante GZIP y HTTP/2, y
  gestionar automáticamente los certificados SSL mediante Let's Encrypt.

  En el caso de que se añadieran más servicios al servidor en un futuro, con
  esta configuración es trivial darles soporte, protegerlos contra ataques DoS
  básicos y asegurar las conexiones con HTTPS.

  En el servidor, los archivos de Caddy los podemos encontrar en
  `/var/www/caddy/`. Aquí se encuentra el archivo de configuración de Caddy. El
  propio ejecutable de Caddy se descarga (sin plugins) y se almacena en
  `/usr/local/bin/caddy`. Los logs se pueden consultar en `/var/log/caddy.log`.

  Para controlar Caddy, se usan los comandos `systemd`:

  ```sh
  $ systemctl start caddy
  $ systemctl stop caddy
  $ systemctl restart caddy
  $ systemctl status caddy
  ```
