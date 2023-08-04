import React from 'react';

export default function Audiocard(props) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="card" style={{ width: '15rem' }}>
        <img className="card-img-top" src={props.thumbnail} alt={props.title} />
        <div className="card-body">
          <p className="card-text">{props.title}</p>
        </div>
      </div>
    </div>
  );
}
