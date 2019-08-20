> Este documento está desactualizado, la instalación de ghost se lleva a cabo
> mediante el CLI de ghost

> Encontrarás ejemplos de todos los archivos en la carpeta
> [config-files](./config-files)

# Configuración inicial

1. Configurar VPS (con Ubuntu Server LTS)

2. Configurar dominio

3. Instalar actualizaciones

```sh
$ apt-get update
$ apt-get upgrade
```

# Usar más memoria (swapfile)

1. Crear y activar archivo swap

```sh
$ fallocate -l 1G /swapfile
$ chmod 600 /swapfile
$ mkswap /swapfile
$ swapon /swapfile
$ sysctl vm.swappiness=10
$ sysctl vm.vfs_cache_pressure=50
```

2. Añadir el swap a `/etc/fstab` - [ejemplo](./config-files/fstab)

3. Añadir el swap a `/etc/sysctl.conf` - [ejemplo](./config-files/sysctl.conf)

# Instalar y configurar Caddy

1. Instalar Caddy y dar permisos para el puerto 80 y 443

```sh
$ curl https://getcaddy.com | bash -s http.minify
$ setcap cap_net_bind_service=+ep /usr/local/bin/caddy
$ mkdir -p /var/www/caddy
```

2. Escribir el Caddyfile (configuración de Caddy) en
   `/var/www/caddy/Caddyfile` - [ejemplo](./config-files/Caddyfile)

3. Escribir archivo de inicio systemd de Caddy en
   `/etc/systemd/system/caddy.service` - [ejemplo](./config-files/caddy.service)

4. Configurar Caddy en su propio usuario

```sh
$ adduser caddy
$ chown -R caddy:caddy /var/www/caddy
$ touch /var/log/caddy.log
$ chown caddy:caddy /var/log/caddy.log
```

5. Activar e iniciar Caddy **Antes de iniciar Caddy, comprueba que el dominio
   configurado en el Caddyfile es accesible y que dirige al VPS.**

```sh
$ systemctl enable caddy
$ systemctl start caddy
```

# Instalar y configurar Ghost

1. Instalar node y yarn

```sh
$ curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
$ echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
$ curl -sL https://deb.nodesource.com/setup_4.x | sudo bash -
$ sudo apt-get update
$ sudo apt-get install -y nodejs yarn
```

2. Instalar ghost

```sh
$ mkdir -p /var/www/ghost
$ git clone https://github.com/cprecioso/makersupv-ghost.git /var/www/ghost --recursive --depth 1
$ cd /var/www/ghost
$ yarn --production
```

3. Escribir la configuración de Ghost en `/var/www/ghost/config.js` -
   [ejemplo](./config-files/config.js) Cambiar `config.production.url` de
   `http://my-ghost-blog.com` a la URL del dominio que toca. **Usa `https://`**,
   ya que Caddy lo activará por defecto. Añadir el nombre de usuario y
   contraseña de Mailgun para evitar que el email se bloquee (o si no
   Outlook/Hotmail lo considera spam).

4. Escribir archivo de inicio systemd de Ghost en
   `/etc/systemd/system/ghost.service` - [ejemplo](./config-files/ghost.service)

5. Configurar Ghost en su propio usuario

```sh
$ adduser ghost
$ chown -R ghost:ghost /var/www/ghost
```

6. Activar e iniciar Ghost

```sh
$ systemctl enable ghost
$ systemctl start ghost
```

# Finalizar

1. Reiniciar

```sh
$ reboot
```

2. ¡Si todo ha ido bien, ya está activo!
