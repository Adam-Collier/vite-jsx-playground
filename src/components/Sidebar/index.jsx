import React from 'react';
import s from './sidebar.module.css';
import { Type, Code, GitHub } from 'react-feather';

import { useAtom } from 'jotai';
import { viewAtom } from '../../atoms';

const Sidebar = () => {
  const [view, setView] = useAtom(viewAtom);

  const Button = ({ Icon, name }) => {
    return (
      <button className={`${s.button} ${name === view ? s.active : ""}`} onClick={() => setView(name)}>
        <Icon size={16} />
      </button>
    );
  };

  return (
    <div className={s.sidebar}>
      <div>
        <Button Icon={Type} name="form" />
        <Button Icon={Code} name="code" />
      </div>
      <Button Icon={GitHub} />
    </div>
  );
};

export default Sidebar;
