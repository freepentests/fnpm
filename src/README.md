# fnpm

A Node.JS package manager similar to NPM. FNPM is designed to enable developers to efficiently install libraries and manage packages with ease, enhancing their overall development experience.

## Supported commands

- `init` - This command simplifies the process of constructing the package.json file by providing an easy-to-use interface with which you can specify the necessary configuration details for your Node.JS project.

- `search` - This command enables developers to browse the NPM package repository from the comfort of their terminal emulator. 

- `install` - This command enables developers to install a specified library from the NPM package repository, accelerating developer efficiency and productivity.

### Flags and Usage Instructions for Each Command

```
init options:
-y, --yes: Utilizing either of these flags will instruct the FNPM command line utility to automatically choose the default configuration options when initializing package.json.

install options:
There are currently no flags for this command.

search options:
There are currently no flags for this command.
```

## Installation Tutorial

## Todo:

- [x] Add init command
- [x] Add search command
- [x] Add install command
- [ ] Add uninstall command
- [ ] Add a custom configuration command
- [ ] Add a configurable anti-skid option, which ensures the `install` command does not function as intended, forcing you to not use libraries in order to prove you're not a skid. This will also forcefully shut down your computer if you attempt to use another package manager such as Yarn or NPM to circumvent the restriction.
- [ ] Add a configurable anti-vibecode option that blocks all AI websites on someone's computer in order to train developers not to vibe code.

