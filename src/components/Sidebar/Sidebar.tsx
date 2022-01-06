import * as React from 'react';
import { FC } from 'react';
import { settings } from '../App';
import NavigationLink from './Navigation/NavigationLink/NavigationLink';

const Sidebar:FC = () => {

  const logoutPathName = settings.woo_account_settings.logout_url.replace(settings.site_url + '/' + settings.woo_account_settings.account_path_name, '');

  return (
    <div className='awmr-navigation'>
      { ( Object.keys( settings.woo_account_settings.endpoints ) as Array<string> ).map( endpoint => {
       return <NavigationLink key={endpoint} endpoint={endpoint} label={settings.woo_account_settings.endpoints[endpoint]} logout_link={logoutPathName}/>
      } ) }
    </div>
  );
};

export default Sidebar;
