1. **USE NODE 4 LTS (`nvm` can help with that)**
1. `git submodule init` and `git submodule update`
1. `npm install`
2. Ensure in the `content` folder there exists these subdirectories: `apps`, `data`, `images`, `themes`
2. `npm start`
3. If it errors when creating the database, start it in production mode (`npm start --production`) and rename the `content/data/ghost.db` file to `ghost-dev.db`. Then you can exit the process and start it in development mode.
4. Go to `http://localhost:2368/ghost/` and set up your account. When finished, choose the makersupv theme. (Read more in its README)
