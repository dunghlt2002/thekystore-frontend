import React from 'react';
import { Email, Item, A} from 'react-html-email';

export default function MyEmail({mylink,name, children}) {
  return (
  <Email title='link'>
    <Item>
       <div>Hello {name}</div>
       <div>Welcome back to our website: www.thekystore.com</div>
    </Item>
    <Item>
      <A style={{ paddingLeft: 10 }}  href={mylink}>{children}</A>
    </Item>
    <Item>
       <div>Have a great day!</div>
    </Item>
  </Email>
)};
