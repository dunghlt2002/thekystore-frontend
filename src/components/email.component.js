import React from 'react';
import { Email, Item, A} from 'react-html-email';

export default function MyEmail({mylink,name, children}) {
  return (
  <Email title='link'>
    <Item>
       Hello {name}
       <A style={{ paddingLeft: 10 }}  href='www.thekystore.com'>Visit our wesbite, click here!</A>
    </Item>
    <Item>
      <A style={{ paddingLeft: 10 }}  href={mylink}>{children}</A>
      
    </Item>
  </Email>
)};
