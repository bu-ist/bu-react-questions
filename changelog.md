# Changelog

## v0.1.1

NPM updates, including updating from Material UI 3 to 4.

## v0.1.0

Add Matching question type.

## v0.0.9

Add Fill in the Blank question type.

## v0.0.8

Fix for Calculated Numeric answer range.

## v0.0.7

Minor code style fixes, including removing unused 'pristine' state from individual components.

## v0.0.6

Fixes a problem where the decimalPlaces prop wasn't being properly passed to the CalculatedNumeric component.

## v0.0.5

This is a breaking change that changes the Question component's prop signature from having a single questionData prop to exposing all of the previous questionData properties as individual props.  This allows us to have more flexibility when defining the PropTypes in a separate file and sharing them between different components.

 To pass the question data as individual props, it is possible to use a [spread operator as used here in the BULB plugin.](https://github.com/bu-ist/bu-learning-blocks/commit/e27a4e9d3fa6c383b0aaab79b337ae7036225ed2)

Changes include:

- PropType definitions
- ESLint setup with AirBNB style guide and Babel parsing
- Code style updates
- CSS updates with SASS placeholders and hyphen-case

## v0.0.4

Changes include:

- CSS styling with SASS-based stylesheets
- Material UI based form controls and icons
- Some component refactoring, including a new TextListAnswer component
- Add 2 event hook props, onSubmit and onReset. Functions passed in via those props get executed when the respective event is complete.
- Fix issue with CN question type wrongly thinking the submitted answer has decimal places when it does not
- Remove i18n for CN question type

## v0.0.3

Package moved to @bostonuniversity org

## v0.0.2

Assume all questions have a correct and incorrect feedback.

```json
{
  "feedback": {
    "correct": "String",
    "incorrect": "String"
  }
}
```
