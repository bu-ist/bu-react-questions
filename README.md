# React Questions

A react component library for self-assement questions.

## How to install

```
$ npm install @bostonuniversity/react-questions
```

## Examples

See [demo/src/index.js](demo/src/index.js) for example usage.

## Changelog

### v0.0.4

Changes include:

- CSS styling with SASS-based stylesheets
- Material UI based form controls and icons
- Some component refactoring, including a new TextListAnswer component
- Add 2 event hook props, onSubmit and onReset. Functions passed in via those props get executed when the respective event is complete.
- Fix issue with CN question type wrongly thinking the submitted answer has decimal places when it does not
- Remove i18n for CN question type

### v0.0.3
Package moved to @bostonuniversity org

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