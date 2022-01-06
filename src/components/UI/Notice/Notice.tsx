import * as React from 'react';
import { FC } from 'react';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

const Notice: FC = () => {
  const type = useTypedSelector(state => state.noticeReducer).type,
        message = useTypedSelector(state => state.noticeReducer).message;
  let typeClass;

  switch ( type ) {
    case 'success':
      typeClass = 'success';
      break;
    case 'errors':
      typeClass = 'errors';
      break;
    case 'warning':
      typeClass = 'warning';
      break;
    default:
      typeClass = 'success';
  }

  return (
    <div className={[typeClass, 'notice p-4 shadow-md rounded fixed bg-white z-50'].join(' ')} style={{zIndex: '9999'}}>
      <span className='text-sm' dangerouslySetInnerHTML={ { __html: message }}/>
    </div>
  );
};

export default Notice;
