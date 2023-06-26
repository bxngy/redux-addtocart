import { useSelector, useDispatch } from "react-redux";
import { updateValue, addTask } from "../redux/todoSlice";

import List from "./list";
import { useState } from "react";

const TodoList = () => {
  const value = useSelector((state) => state.todo.inputTaskValue);
  const products = useSelector((state) => state.todo.products);
  const carts = useSelector((state) => state.todo.cart);

  const [product, setProduct] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e, obj) => {
    let updatedValue = {
      name: obj == "name" ? e.target.value : product.name,
      price: obj == "price" ? e.target.value : product.price,
      qty: obj == "qty" ? e.target.value : product.qty,
    };
    setProduct((product) => ({
      ...product,
      ...updatedValue,
    }));

    // dispatch(updateValue(e.target.value));
  };

  const handleKeyEnter = (e) => {
    if (e.key === "Enter") {
      dispatch(addTask());
    }
  };

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

    return sum;
  };

  return (
    <>
      <table class="table mt-3">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Product ID</th>
            <th scope="col">Product Name</th>
            <th scope="col">Product Price</th>
            <th scope="col">Product QTY</th>
            <th scope="col">action</th>
          </tr>
        </thead>
        <tbody>
          {products.length ? (
            products.map((todo, index) => (
              <List
                key={todo.id}
                index={index}
                id={todo.id}
                {...todo}
                isProductList
              />
            ))
          ) : (
            <h3>No Product...</h3>
          )}
        </tbody>
      </table>

    </>
  );
};

export default TodoList;
