# fnpm

A Node.JS package manager with a strong emphasis on anti-skid policies. FNPM is designed to enable developers to efficiently install libraries and manage packages with ease, enhancing their overall development experience.

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

1. Clone this repo
2. Run "npm link" (this will be your last npm command)
3. Now delete npm with your system's package manager
4. Start using fnpm instead

## Todo:

- [x] Add `init` command
- [x] Add `search` command
- [x] Add `install` command
- [x] Add `run` command
- [ ] Add `uninstall` command
- [x] Add `config` command
- [ ] Add a configurable anti-skid option which deliberately breaks the `install` command to prevent people installing libraries (installing libraries is skidding). If the `npm` or `yarn` libraries are present on a user system, they will temporarily be replaced with the `shutdown` binary, meaning that if a user attempts to circumvent the anti-skid policies by utilizing other libraries, their computer will shut down instead.
- [ ] Add a configurable anti-vibecode option that blocks all AI websites on someone's computer in order to train developers not to vibe code.

