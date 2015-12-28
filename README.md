# living-spec 

Produce living spec documents from cucumber (gherkin) specs.

## Installation

Download node at [nodejs.org](http://nodejs.org) and install it, if you haven't already.

```sh
npm install -g living-spec
```

## Usage

Then run it against your feature spec files:

```sh
living-spec -o outdir -T 'Spec for my Project' /path/to/spec/files
```

## Customization

You can supply your own template files by taking a copy of the 'templates' directory
and modifying the files to suit. Use your new template with the '-t' switch.

## Dependencies

- [findit](https://github.com/substack/node-findit): walk a directory tree recursively with events
- [gherkin](https://github.com/cucumber/gherkin-javascript): Gherkin parser
- [handlebars](https://github.com/wycats/handlebars.js): Handlebars provides the power necessary to let you build semantic templates effectively with no frustration
- [ncp](https://github.com/AvianFlu/ncp): Asynchronous recursive file copy utility.
- [yargs](https://github.com/bcoe/yargs): Light-weight option parsing with an argv hash. No optstrings attached.

## License

ISC

