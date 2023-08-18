/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*****************************!*\
  !*** ./src/js/printform.js ***!
  \*****************************/
var __ = wp.i18n.__;
var registerBlockType = wp.blocks.registerBlockType;
var _wp$blockEditor = wp.blockEditor,
  RichText = _wp$blockEditor.RichText,
  InspectorControls = _wp$blockEditor.InspectorControls;
var _wp$components = wp.components,
  TextControl = _wp$components.TextControl,
  PanelBody = _wp$components.PanelBody;
registerBlockType('pacfiftyfour/printform', {
  title: 'Pacific54 Form',
  icon: 'printer',
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
      title: "Linked Block"
    }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "Block ID:")), /*#__PURE__*/React.createElement("p", null, "You can link this form to a formlog block by adding an ID to the formlog and then entering the ID here"), /*#__PURE__*/React.createElement(TextControl, {
      value: linkedblock,
      onChange: onFormLinkChange
    })), ","), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "pacific-form"
    }, /*#__PURE__*/React.createElement(RichText, {
      tagName: "h3",
      placeholder: "Set the title to your form",
      value: title,
      onChange: function onChange(value) {
        onTitleChange(value);
      }
    }), /*#__PURE__*/React.createElement("h4", null, "Linked Block: ", linkedblock), /*#__PURE__*/React.createElement("div", {
      className: "form-inner"
    }, /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("label", {
      "for": "pf-name"
    }, "\uD83E\uDDD1 Name:"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "pf-name",
      name: "pf-name",
      disabled: true
    }), /*#__PURE__*/React.createElement("label", {
      "for": "pf-phone"
    }, "\uD83D\uDCF1 Phone number:"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "pf-phone",
      name: "pf-phone",
      disabled: true
    }), /*#__PURE__*/React.createElement("label", {
      "for": "pf-email"
    }, "\u2709\uFE0F Email:"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "pf-email",
      name: "pf-email",
      disabled: true
    }), /*#__PURE__*/React.createElement("label", {
      "for": "pf-message"
    }, "\uD83D\uDCAC Message:"), /*#__PURE__*/React.createElement("textarea", {
      id: "pf-message",
      name: "pf-message",
      disabled: true
    }), /*#__PURE__*/React.createElement("button", null, "Submit")))))];
  },
  save: function save(_ref2) {
    var attributes = _ref2.attributes;
    var title = attributes.title,
      linkedblock = attributes.linkedblock;
    return /*#__PURE__*/React.createElement("div", {
      className: "pacific-form"
    }, /*#__PURE__*/React.createElement(RichText.Content, {
      tagName: "h3",
      value: title
    }), /*#__PURE__*/React.createElement("div", {
      className: "form-inner"
    }, /*#__PURE__*/React.createElement("form", {
      "data-action": "submit_form_log",
      "data-linked-form": linkedblock ? linkedblock : ''
    }, /*#__PURE__*/React.createElement("div", {
      className: "dialog"
    }), /*#__PURE__*/React.createElement("label", {
      "for": "pf-name"
    }, "\uD83E\uDDD1 Name:"), /*#__PURE__*/React.createElement("span", {
      id: "validate-pf-name"
    }), /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "pf-name",
      name: "pf-name",
      "data-validate": "name"
    }), /*#__PURE__*/React.createElement("label", {
      "for": "pf-phone"
    }, "\uD83D\uDCF1 Phone number:"), /*#__PURE__*/React.createElement("span", {
      id: "validate-pf-phone"
    }), /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "pf-phone",
      name: "pf-phone",
      "data-validate": "phone"
    }), /*#__PURE__*/React.createElement("label", {
      "for": "pf-email"
    }, "\u2709\uFE0F Email:"), /*#__PURE__*/React.createElement("span", {
      id: "validate-pf-email"
    }), /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "pf-email",
      name: "pf-email",
      "data-validate": "email"
    }), /*#__PURE__*/React.createElement("label", {
      "for": "pf-message"
    }, "\uD83D\uDCAC Message:"), /*#__PURE__*/React.createElement("span", {
      id: "validate-pf-message"
    }), /*#__PURE__*/React.createElement("textarea", {
      id: "pf-message",
      name: "pf-message",
      "data-validate": "message"
    }), /*#__PURE__*/React.createElement("button", {
      onclick: "pacformsubmit(event);"
    }, "Submit"))));
  }
});
/******/ })()
;
//# sourceMappingURL=printform.js.map