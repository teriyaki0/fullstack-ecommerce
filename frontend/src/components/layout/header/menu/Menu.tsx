import { FC } from "react";
import { Link } from "react-router-dom";

import styles from "./Menu.module.scss";

import logo from "@assets/image/Starbucks_Corporation_Logo_2011.svg.png";

import { data } from "./menu.data";
import MenuItem from "./menu-item/MenuItem";

const Menu: FC = () => {
  return (
    <div className={styles.root}>
      <Link to='/'>
        <img src={logo} alt='logo' width={100} height={100} />
      </Link>
      <nav>
        <ul>
          {data.map((item) => (
            <MenuItem key={item.link} item={item} />
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
