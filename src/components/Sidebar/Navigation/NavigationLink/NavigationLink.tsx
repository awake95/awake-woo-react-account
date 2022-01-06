import * as React from 'react';
import { FC } from 'react';
import { NavLink, Link } from 'react-router-dom';

type TEndpoint = {
  endpoint: string,
  label: string,
  logout_link: string
}

const NavigationLink: FC<TEndpoint> = ( { endpoint, label, logout_link } ) => {

  return (
    <li className={ [ 'awmr-navigation__item', endpoint ].join( ' ' ) }>
      {
        endpoint !== 'customer-logout' ?
          <NavLink
            to={ endpoint === 'dashboard' ? '/' : endpoint}>{ label }</NavLink>
          :
          <Link to={ logout_link } replace={true} reloadDocument >{label}</Link>
      }

    </li>
  );
};

export default NavigationLink;
