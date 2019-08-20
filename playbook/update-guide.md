Para actualizar Ghost a una nueva versión:

1. **IMPORTANTE** Comprobar en el [blog de Ghost](https://dev.ghost.org) que no
   se trata de ningún cambio grande.

2. Entra con SSH en el servidor

3. Actualiza el CLI de ghost:

```sh
sudo npm i -g ghost-cli@latest
```

4. Entra en el usuario de configuración de ghost

```sh
su ghostsetup
```

5. Sigue las instrucciones de actualización de Ghost en
   https://ghost.org/update/
