import React from 'react';
import { Email, Item, A} from 'react-html-email';

export default function MyEmail({mylink,name,children,childrenextra}) {
  return (
  <Email title='link'>
    <Item>
       <div>Hello {name}</div>
       <div>Welcome back to www.thekystore.com</div>
       <br></br>
    </Item>
    <Item>
      <br></br>
      <A style={{ paddingLeft: 1 }}  href={mylink}>{children}</A>
    </Item>
    <Item>
      <br></br>
      <div>{childrenextra}</div>
    </Item>
    <Item>
        <br></br>
        <div>This is an automatically generated email. Please do not reply to this email. Have a great day!</div>
    </Item>
  </Email>
)};
