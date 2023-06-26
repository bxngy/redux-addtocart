import { useSelector, useDispatch } from "react-redux";
import { updateValue, addTask } from "../redux/todoSlice";
import { useState } from "react";

const AddProduct = () => {
  const [product, setProduct] = useState({});
  const [modalProduct, setModalProduct] = useState(false);
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
    setModalProduct(false);
  };

  return (
    <>
      <button
        className="btn btn-success mx-2"
        onClick={(e) => {
          setModalProduct(true);
        }}
      >
        Add Product
      </button>

      {modalProduct && (
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
                width: "300px",
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
                  setModalProduct(false);
                }}
              >
                x
              </div>
              <label>Product Name</label>
              <input
                className="form-control my-2"
                type="text"
                placeholder="Enter task"
                value={product.name}
                onChange={(e) => {
                  handleChange(e, "name");
                }}
              />
              <label>Product Price</label>

              <input
                className="form-control my-2"
                type="number"
                placeholder="Enter task"
                value={product.price}
                onChange={(e) => {
                  handleChange(e, "price");
                }}
              />
              <label>Product QTY</label>

              <input
                className="form-control my-2"
                type="number"
                placeholder="Enter task"
                value={product.qty}
                onChange={(e) => {
                  handleChange(e, "qty");
                }}
              />
              <button
                className="btn btn-sucess mt-5"
                onClick={() => dispatch(addTask(product))}
              >
                ADD PRODUCT
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProduct;
