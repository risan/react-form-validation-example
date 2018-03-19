import React from 'react';

function HorizontalField({ label = '', fieldLabel = '', error, children }) {
  return (
    <div className="field is-horizontal">
      <div
        className={`field-label ${fieldLabel ? 'is-' + fieldLabel : ''}`.trim()}
      >
        <label className="label">{label}</label>
      </div>
      <div className="field-body">
        <div className="field">
          <div className="control">{children}</div>
          {error ? <p className="help is-danger">{error}</p> : null}
        </div>
      </div>
    </div>
  );
}

export default HorizontalField;
