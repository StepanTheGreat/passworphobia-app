# Passworphobia
A password manager that doesn't store passwords!

# How?
All your passwords are randomly generated, by using the secret pass-phrase. With this you can achieve very strong, traceless and rememberable passwords.
We also provide a way to generate a long, strong and unique salt, which will make your password even more unpredictable (Don't forget to move the old salt to a new device if you're migrating).

Additionaly featuring a customizable, basic character set and size list for password generation (For some specific websites)

# Features
- Master password, which encrypts your salt
- Custom character sets: 
    - Characters *AaBb*
    - Symbols *#@/$*
    - Numbers *1234*
- Customizable settings:
    - Change/Regenerate salt
    - Change your master password
- Languages supported:
    - English
    - French
    - Estonian
    - Ukrainian
    - Russian
    *Issues are accepted, in case you have a better/more concise translation request*
- Password generation using a 512bit hashing algorithm

# Building from source
Unfortunately we're not planning on distributing to all linux distros (Currently only planning for debian), so you can clone our project and build it
using tauri and node.js via `npm tauri build`.

1. Obviously, you should have both Rust *(We use 1.26)* and NodeJS *(We use 18.16)*
2. Clone our repository `git clone https://github.com/StepanTheGreat/passworphobia-app`
3. Install npm packages, via `npm install`
4. Compile `password-generator`:
    1. Install wasm-pack `cargo install wasm-pack`
    2. Go to the library directory `cd password-generator`
    3. Build as a JS library with `wasm-pack build --target bundler`
    4. Go to the pkg dir `cd pkg`
    5. Link it to npm `npm link`
    6. Return back to main directory `cd ../../`
    7. Link it here too `npm link password-generator`
5. Build with `npm tauri build` (Release binary)

# Contribution
This is a private project, so we won't support any push requests. But we'll gladly look at bugs/issues or some minor features.

