import { useSelector, useDispatch } from "react-redux";
import { updateValue, addTask,clearAll } from "../redux/todoSlice";
import * as XLSX from 'xlsx';

import List from "./list";
import { useState } from "react";

const Cart = () => {
  const dispatch = useDispatch();

  const carts = useSelector((state) => state.todo.cart);
  const [modalCart, setModalCart] = useState(false);
  const handleExcelExport = () => {
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(carts)
    XLSX.utils.book_append_sheet(wb, ws, "Comments");
    XLSX.writeFile(wb, "product.xlsx");
}
  const sumQTY = () => {
    const sum = carts.reduce((accumulator, object) => {
      return accumulator + object.qty;
    }, 0);
    return sum;
  };

  const sumPrice = () => {
    const sum = carts.reduce((accumulator, object) => {
      return accumulator + object.price * object.qty;
    }, 0);

    return sum.toFixed(2);
  };

  return (
    <>
      <button
        className="btn btn-warning mx-2 relative col-3"
        style={{ position: "relative" }}
        onClick={(e) => {
          setModalCart(true);
        }}
      >
        Cart{" "}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            zIndex: 9,
            backgroundColor: "red",
            borderRadius: 99,
            width: 30,
            height: 30,
            color: "white",
          }}
        >
          {sumQTY()}
        </div>
      </button>

      {modalCart && (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "#0000008c",
            position: "absolute",
            zIndex: 9,
            margin: "auto",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <div className="relative">
            <div
              className="card p-3"
              style={{
                width: "max-content",
                height: "max-content",

                position: "absolute",
                zIndex: 9,
                margin: "auto",
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  border: "1px solid black ",
                  padding: "5px",
                  borderRadius: 99,
                  width: "20px",
                  height: "20px",
                }}
                onClick={() => {
                  setModalCart(false);
                }}
              >
                x
              </div>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Product ID</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Product Price</th>
                    <th scope="col">Product QTY</th>
                  </tr>
                </thead>

                {carts.length ? (
                  carts.map((todo, index) => (
                    <tbody>
                      <List
                        key={todo.id}
                        index={index}
                        id={todo.id}
                        {...todo}
                      />
                    </tbody>
                  ))
                ) : (
                  <div className="row justify-content-center">
                    <p>No Product in cart...</p>
                  </div>
                )}
              </table>
              <div className="row justify-content-end mx-3">
                Grand Total : {sumQTY()} qty.
              </div>
              <div className="row justify-content-end mx-3">
                Total : {sumPrice()} bath.
              </div>


              <button className="btn btn-success my-2" onClick={()=>{
                handleExcelExport()
              }}>
                Check Out
              </button>
              <button className="btn btn-danger my-2" onClick={()=>{
                dispatch(clearAll());
              }}>
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
