import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AcUnitIcon from '@material-ui/icons/AcUnit';

import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser, toggleCart } from "../Redux/Action";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();

  const {currentUser, cartItems, showCart } = useSelector((state) => state);

  return (
    <div>
      <AppBar position="static" className="bg-dark text-white" style={{height: 65}}>
        <Toolbar>
          <Link to="/login" className="text-decoration-none ml-2 btn text-light">
            <AcUnitIcon className="mr-1" />
            Inventory Manager
            </Link>
          <span className="ml-auto">
            <Button
              variant="contained"
              size="small"
              onClick={() => dispatch(toggleCart(!showCart))}
              className="mr-2"
            >
              <ShoppingCartIcon />
              <span>{cartItems.length ? cartItems.length : ""}</span>
            </Button>
            {currentUser ?<Button variant="contained" size="small" color="secondary" onClick={()=> dispatch(setCurrentUser(null))}>
                Logout
              </Button> :<Link to="/login" className="text-decoration-none ml-2">
              <Button variant="contained" size="small" color="primary">
                Login
              </Button>
            </Link>}
          </span>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
