import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import { Card, CardContent } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems, toggleCart } from "../Redux/Action";
import Cart from "./Cart";
import Products from "./Data.json"

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

const Inventory = () => {
 

  const { cartItems, showCart } = useSelector((state) => state);
  const dispatch = useDispatch();

  const addToCart=(item)=>{
    console.log(cartItems)
   
     let isExists= cartItems.find(items=> items.id === item.id)
     if(isExists){
       cartItems.map((items, idx)=>{
         if (items.id === item.id){
          cartItems[idx].qty = items.qty +1
         }
       })
     }else {
      cartItems.push({...item, qty: 1})
     }
     dispatch(setCartItems(cartItems))
   
  }

  const removeFromCart =(item)=>{
    let isExists= cartItems.find(items=> items.id === item.id)
    if(isExists){
      cartItems.map((items, idx)=>{
        if (items.id === item.id){
         if(items.qty>1){
          cartItems[idx].qty = items.qty -1
          
         dispatch(setCartItems([...cartItems]))
         } else {
           
         dispatch(setCartItems(cartItems.filter(items=> items.id !== item.id)))
         }
        }
      })
    }
  }
 
  const classes = useStyles();
  return (
    <div className="mt-4 mb-5">
      <Card className="my-3 bg-light" variant="outlined">
        <CardContent>
          {showCart ? (
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => dispatch(toggleCart(false))}
              >
                Back
              </Button>
            </div>
          ) : (
            <>
            <h2 className="text-center font-weight-bold text-primary" >Inventory</h2>
              
            </>
          )}
        </CardContent>
      </Card>
      {showCart ? (
        <Cart  />
      ) : (
        <div>
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
                    {Products.map((item, i)=><StyledTableRow key={i}>
                      <StyledTableCell>
                        <strong>{i + 1}.</strong>
                      </StyledTableCell>
                      <StyledTableCell align="left" className="font-weight-bold" >
                        {item.Name}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.price}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.Location}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.qty} 
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {(cartItems.find(items=> items.id === item.id))?
                        <Button
                        variant="contained"
                        color="secondary"
                       onClick={()=>removeFromCart(item)}
                      >
                        Remove
                      </Button>
                        :
                        <Button
                          variant="contained"
                          color="primary"
                         onClick={()=>addToCart(item)}
                        >
                          Add to cart
                        </Button>
                        }
                        
                      </StyledTableCell>
                    </StyledTableRow>
                  )}
              </TableBody>
            </Table>
          </TableContainer>
         
        </div>
      )}
    </div>
  );
};

export default Inventory;
