import React from 'react';
import Instagram from './Instagram';
import Twitter from './Twitter';
import Facebook from './Facebook';
import LinkedIn from './LinkedIn';

const Social = ({ social: { type, handle }}) => {
  if (type === 'instagram') {
    return <Instagram handle={handle} />;
  } else if (type === 'twitter') {
    return <Twitter handle={handle} />;
  } else if (type === 'facebook') {
    return <Facebook handle={handle} />;
    } else if (type === 'linkedin') {
      return <LinkedIn handle={handle} />;
    } else {
    return null;
  }
};

export default Social;
