Para actualizar Ghost a una nueva versión:

1. **IMPORTANTE** Comprobar en el [blog de Ghost](https://dev.ghost.org) que no se trata de ningún cambio grande.

2. **MÁS IMPORTANTE AÚN** Descarga la carpeta entera `/var/www/ghost/` en tu ordenador para poder volver a subirla y restaurarla rápidamente en el caso de un error.

3. Clonar el repositorio en tu ordenador y ejecutar `yarn`

4. Actualizar la dependencia de Ghost con `yarn upgrade`

5. Guardar el _commit_ y subirlo a GitHub.

6. Acceder mediante SSH al VPS y navegar a la carpeta `/var/www/ghost/`

7. `git pull`

8. Comprobar que no ha habido errores en esta operación. Una vez hecho, ejecutar `yarn` para instalar las nuevas dependencias.

9. `chown -R ghost:ghost .`

10. El momento de la verdad: `systemctl restart ghost`. Usa `systemctl status ghost` para comprobar que se haya iniciado correctamente.
