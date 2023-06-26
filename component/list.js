import { useDispatch } from "react-redux";
import { addToCart } from "../redux/todoSlice";
import {separateComma} from "../utils/utitities"
const List = (props) => {
  const dispatch = useDispatch();

  return (
    <tr>
      <td>{props.index + 1}</td>
      <td>{props.id}</td>
      <td>{props.name}</td>
      <td className="text-right">{separateComma(props.price.toFixed(2))} </td>
      <td className="text-right">{separateComma(props.qty)}</td>
      {props.isProductList && (
        <button
        className="btn btn-primary"
          disabled={props.qty == 0}
          onClick={() => dispatch(addToCart(props))}
        >
          Add to cart
        </button>
      )}
    </tr>
  );
};

export default List;
