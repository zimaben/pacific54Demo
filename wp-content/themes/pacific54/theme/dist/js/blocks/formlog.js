/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***************************!*\
  !*** ./src/js/formlog.js ***!
  \***************************/
var __ = wp.i18n.__;
var registerBlockType = wp.blocks.registerBlockType;
var _wp$blockEditor = wp.blockEditor,
  RichText = _wp$blockEditor.RichText,
  InspectorControls = _wp$blockEditor.InspectorControls;
var _wp$components = wp.components,
  TextControl = _wp$components.TextControl,
  PanelBody = _wp$components.PanelBody;
registerBlockType('pacfiftyfour/formlog', {
  title: 'Pacific54 Form Log',
  icon: 'forms',
  category: 'pacific-fiftyfour',
  //attributes
  attributes: {
    title: {
      type: 'string',
      "default": ''
    },
    linkedblock: {
      type: 'string',
      "default": ''
    }
  },
  edit: function edit(_ref) {
    var attributes = _ref.attributes,
      setAttributes = _ref.setAttributes;
    var title = attributes.title,
      linkedblock = attributes.linkedblock;
    function onTitleChange(newtitle) {
      setAttributes({
        title: newtitle
      });
    }
    function onFormLinkChange(newtext) {
      setAttributes({
        linkedblock: newtext
      });
    }
    return [/*#__PURE__*/React.createElement(InspectorControls, {
      style: {
        marginBottom: '20px'
      }
    }, /*#__PURE__*/React.createElement(PanelBody, {
      title: "Give this Block an ID"
    }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "Block ID:")), /*#__PURE__*/React.createElement("p", null, "You can use this to link the form to the Index"), /*#__PURE__*/React.createElement(TextControl, {
      value: linkedblock,
      onChange: onFormLinkChange
    })), ","), /*#__PURE__*/React.createElement("div", {
      className: "pacific-formlog",
      id: linkedblock
    }, /*#__PURE__*/React.createElement(RichText, {
      tag: "h2",
      value: title,
      placeholder: "Give your Log a title",
      onChange: onTitleChange
    }), /*#__PURE__*/React.createElement("div", {
      className: "formlog-card"
    }, /*#__PURE__*/React.createElement("h2", null, "(Example Form)"), /*#__PURE__*/React.createElement("div", {
      className: "formlog-body"
    }, /*#__PURE__*/React.createElement("span", {
      "class": "speech"
    }, /*#__PURE__*/React.createElement("p", null, "Hey man just wanted to hit you up with a message")), /*#__PURE__*/React.createElement("span", {
      className: "just-the-tip"
    }), /*#__PURE__*/React.createElement("h4", {
      "class": "name"
    }, "\uD83E\uDDD1 Joe Commenter")), /*#__PURE__*/React.createElement("div", {
      "class": "formlog-footer"
    }, /*#__PURE__*/React.createElement("h5", {
      "class": "phone"
    }, "\uD83D\uDCF1 444-444-4444"), /*#__PURE__*/React.createElement("h5", {
      "class": "email"
    }, "\u2709\uFE0F my@email.hi"))))];
  },
  save: function save(_ref2) {
    var attributes = _ref2.attributes;
  }
});
/******/ })()
;
//# sourceMappingURL=formlog.js.map