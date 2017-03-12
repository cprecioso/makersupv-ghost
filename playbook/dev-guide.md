# Guía para editar el tema de Ghost

1. **USE NODE 4 LTS (`nvm` can help with that)**
2. `git submodule init` and `git submodule update`
3. `npm install`, or better, `yarn`
4. Ensure in the `content` folder there exists these subdirectories: `apps`, `data`, `images`, `themes`
5. `npm start`
6. If it errors when creating the database, start it in production mode (`npm start --production`) and rename the `content/data/ghost.db` file to `ghost-dev.db`. Then you can exit the process and start it in development mode.
7. Go to `http://localhost:2368/ghost/` and set up your account. When finished, choose the makersupv theme and start editing it. (Read more in its README)