# fnpm

A Node.JS package manager with a strong emphasis on anti-skid policies. FNPM is designed to enable developers to efficiently install libraries and manage packages with ease, enhancing their overall development experience.

## Supported commands

- `init` - This command simplifies the process of constructing the package.json file by providing an easy-to-use interface with which you can specify the necessary configuration details for your Node.JS project.

- `search` - This command enables developers to browse the NPM package repository from the comfort of their terminal emulator. 

- `install` - This command enables developers to install a specified library from the NPM package repository, accelerating developer efficiency and productivity.

- `config` - This command provides a simplified interface for modifying the NPM configuration file, which contains entries that influence the behavior of the FNPM command line utility.

- `antiskid`- This command deliberately prevents the `install` command from functioning to prevent people who don't understand the libraries they're using from skidding.

- `run` - This command enables developers to execute shell scripts specified in the package.json file by referencing the name of the shell script they want to execute.

### Flags and Usage Instructions for Each Command

```
init:
-y, --yes: Utilizing either of these flags will instruct the FNPM command line utility to automatically choose the default configuration options when initializing package.json.
Usage: `fnpm init <flags>`

antiskid:
-e, --enable: Utilizing either of these flags with instruct the FNPM command line utility to enable the anti-skid policies.
-d, --disable: Utilizing either of these flags with instruct the FNPM command line utility to disable the anti-skid policies.
Usage: `fnpm antiskid <flags> <user-to-enable-antiskid-for>`

config:
--key=<key-name>: Utilizing this flag will instruct the FNPM command line utility to use the given configuration entry key to perform an action on.
--value=<value>: Utilizing this flag will instruct the FNPM command line utility to set a specific value to a given entry key.
-a, --add: Utilizing either of these flags will tell the FNPM command line utility that you desire to add an entry to the configuration file.
-d, --delete: Utilizing either of these flags will tell the FNPM command line utility that you desire to remove an entry from the configuration file.
Usage: `fnpm config <flags>`

install:
There are currently no flags for this command.
Usage: `fnpm install <command-name>`

search:
There are currently no flags for this command.
Usage: `fnpm search <search-query>`

run:
There are currently no flags for this command.
Usage: `fnpm run <script-name>`
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
- [x] Add `config` command
- [x] Add `antiskid` command
- [ ] Add `antivibecode` command (blocks AI websites on a user's computer)
- [ ] Add `uninstall` command

