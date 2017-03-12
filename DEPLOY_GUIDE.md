# Configuración inicial
1. Configurar VPS

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

2. Añadir la siguiente línea a `/etc/fstab`
  ```
  /swapfile      none            swap    sw                           0 0
  ```

3. Añadir las siguientes líneas a `/etc/sysctl.conf`
  ```
  vm.swappiness = 10
  vm.vfs_cache_pressure = 50
  ```

# Instalar y configurar Caddy
1. Instalar Caddy y dar permisos para el puerto 80 y 443
  ```sh
  $ curl -fsSL https://getcaddy.com | bash -s git
  $ setcap cap_net_bind_service=+ep /usr/local/bin/caddy
  $ mkdir -p /var/www/caddy
  ```

2. Escribir el Caddyfile (configuración de Caddy) en `/var/www/caddy/Caddyfile`
  ```caddy
  https://web.com {

    gzip
    tls correodealguien@servidor.com
    log /var/log/caddy.log

    proxy / localhost:2368 {
      header_upstream Host {host}
      header_upstream X-Real-IP {remote}
      header_upstream X-Forwarded-For {remote}
      header_upstream X-Forwarded-Proto {scheme}
      transparent
    }

  }

  https://www.web.com {

    tls correodealguien@servidor.com
    redir https://web.com{uri}

  }
  ```

3. Escribir archivo de inicio systemd en `/etc/systemd/system/caddy.service`
  ```systemd
  [Unit]
  Description=Caddy webserver
  After=network.target

  [Service]
  ExecStart=/usr/local/bin/caddy --agree
  User=caddy
  Group=caddy
  WorkingDirectory=/var/www/caddy
  LimitNOFILE=8192
  PIDFile=/var/run/caddy/caddy.pid
  Restart=on-failure
  StartLimitInterval=300

  [Install]
  WantedBy=multi-user.target
  ```

4. Configurar Caddy en su propio usuario
  ```sh
  $ adduser caddy
  $ chown -R caddy:caddy /var/www/caddy
  $ touch /var/log/caddy.log
  $ chown caddy:caddy /var/log/caddy.log
  ```

5. Activar e iniciar Caddy
  **Antes de iniciar Caddy, comprueba que el dominio configurado en el Caddyfile es accesible y que dirige al VPS.**
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

3. Editar la configuración de Ghost en `/var/www/ghost/config.js`
  Cambiar `config.production.url` de `http://my-ghost-blog.com` a la URL del dominio que toca. **Usa `https://`**, ya que Caddy lo activará por defecto.
  Añadir el nombre de usuario y contraseña de Mailgun para evitar que el email se bloquee (o si no Outlook/Hotmail lo considera spam).

4. Escribir archivo de inicio systemd en `/etc/systemd/system/ghost.service`
  ```systemd
  [Unit]
  Description=Ghost server
  After=network.target

  [Service]
  ExecStart=/var/www/ghost/start.sh
  User=ghost
  Group=ghost
  Environment=PATH=/usr/bin:/usr/local/bin
  Environment=NODE_ENV=production
  WorkingDirectory=/var/www/ghost
  LimitNOFILE=8192
  PIDFile=/var/run/ghost/ghost.pid
  Restart=on-failure
  StartLimitInterval=300

  [Install]
  WantedBy=multi-user.target
  ```

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

2. ¡Si todo ha ido bien, ya está todo!
