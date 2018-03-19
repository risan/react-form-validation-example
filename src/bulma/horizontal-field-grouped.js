import React from 'react';

function HorizontalFieldGrouped({ label = '', controls = [], children }) {
  return (
    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label">{label}</label>
      </div>
      <div className="field-body">
        <div className="field is-grouped">
          {children
            ? children
            : controls.map((control, idx) => (
                <div key={idx} className="control">
                  {control}
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default HorizontalFieldGrouped;
