import React, { useEffect } from 'react';

export default function Play(props) {
  useEffect(() => {
    console.log(props.Url, "idher tak pohonch gaye"); // Log the value of props.Url when the component mounts
  }, [props.Url]); // Run the effect when props.Url changes

  return (
    <div>
        
    </div>
  );
}
