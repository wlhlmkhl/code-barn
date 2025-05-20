# CodeBarn

A simple, modular, and beginner-friendly Node.js command-line interface (CLI) tool for managing code snippets.

![npm version](https://img.shields.io/npm/v/codebarn)

## Installation

Install globally from npm:

```bash
npm install -g codebarn
```

## Usage

Below are the available commands:

### Create folders

```bash
codebarn create
```

Creates the main folders (`codebarn`, `in`, `out`) in the root directory.

---

### Copy files to database

```bash
codebarn copy
```

Copies all files from the input folder to the database and deletes them from the folder.

---

### List all snippets

```bash
codebarn list
```

Shows a list of all snippets stored in the database.

---

### Delete snippets

```bash
codebarn delete all
```

Deletes all snippets from the database.

```bash
codebarn delete <uuid>
```

Deletes a specific snippet by its UUID.

---

### Fetch snippets

```bash
codebarn fetch all
```

Exports all snippets to files in the output folder.

```bash
codebarn fetch <uuid>
```

Exports a specific snippet by its UUID to a file in the output folder.

---

## Example Workflow

1. Place files you want to save in the `codebarn/in` folder.
2. Run `codebarn copy` to add them to the database.
3. Use `codebarn list` to see all stored snippets.
4. Use `codebarn fetch all` to export all snippets to files in `codebarn/out`.
5. Use `codebarn delete <uuid>` to remove a specific snippet.

## Development

- All main logic is in the `src/commands` and `src/utils` folders.
- Paths are managed in `src/config/PATHS.mjs`.
- Database is handled with [lowdb](https://github.com/typicode/lowdb).

## License

MIT

---

_Made with ❤️ for learning and productivity!_
