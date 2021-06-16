import React from "react";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";

import { useDispatch, useSelector } from "react-redux";
import { setCartItems } from "../Redux/Action";

import Products from "./Data.json";
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const Cart = () => {
  const classes = useStyles();

  const { cartItems } = useSelector((state) => state);
  const dispatch = useDispatch();

  const changeItemNumber = (e, item, idx) => {
    let Value = e.target.value;
    if (Value < 1) return;
    let isExists = Products.find((items) => items.id === item.id);
    console.log(isExists);
    if (isExists) {
      if (isExists.qty > Value) {
        cartItems[idx] = {...item, qty:Value};
        dispatch(setCartItems([...cartItems]));
      }
    }
  };

  return (
    <div>
      {cartItems.length ? (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell align="left">NAME</StyledTableCell>
                <StyledTableCell align="right">PRICE</StyledTableCell>
                <StyledTableCell align="right">LOCATION</StyledTableCell>
                <StyledTableCell align="right">QUANTITY</StyledTableCell>
                <StyledTableCell align="right">{}</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item, i) => (
                <StyledTableRow key={i}>
                  <StyledTableCell>
                    <strong>{i + 1}.</strong>
                  </StyledTableCell>
                  <StyledTableCell align="left">{item.Name}</StyledTableCell>
                  <StyledTableCell align="right">{item.price}</StyledTableCell>
                  <StyledTableCell align="right">
                    {item.Location}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <input
                      type="number"
                      className="form-control ml-auto"
                      style={{ width: 60 }}
                      onChange={(e) => changeItemNumber(e, item, i)}
                      value={item.qty}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        var filteredCartItem = cartItems.filter(function (e) {
                          return e !== item;
                        });
                        dispatch(setCartItems(filteredCartItem));
                      }}
                    >
                      Remove
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div
          className="d-flex align-items-center justify-content-center bg-light rounded-lg text-danger flex-column"
          style={{ height: 250 }}
        >
          <RemoveShoppingCartIcon />
          <h6>Empty cart!</h6>
          <div>
            <small>
              <i>Please add some items</i>
            </small>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
