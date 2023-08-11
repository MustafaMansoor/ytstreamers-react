import React from 'react';
export default function Audiocard(props) {
  const cardid=()=>{
    props.getid(props.id)
  };
  return (
    <div onClick={cardid}style={{  border: 'none' }}>
      <div style={{ position: 'relative' }}>
        <img className="card-img-top"src={props.thumbnail}alt={props.title}style={{ objectFit: 'cover' }}/>
        <span className="badge rounded-pill bg-dark position-absolute bottom-0 end-0 m-2"style={{ zIndex: 1 }}>
          {props.duration}
        </span>
      </div>
      <div className="card-body">
        <p className="card-text">{props.title}</p>
      </div>
    </div>
  );
}
