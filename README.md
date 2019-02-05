# React Questions

A react component library for self-assement questions.

## How to install

```
$ npm install @carlosesilva/react-questions
```

## Examples

See [demo/src/index.js](demo/src/index.js) for example usage.

## Changelog

### v0.0.4

Changes include:

- CSS styling with SASS-based stylesheets
- Material UI based form controls and icons
- Some component refactoring, including a new TextListAnswer component

### v0.0.2

Assume all questions have a correct and incorrect feedback.
```json
{
  "feedback": {
    "correct": "String",
    "incorrect": "String"
  }
}
```