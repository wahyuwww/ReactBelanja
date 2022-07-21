import React,{ useState} from 'react'
import '../home/StyleHome.css'
// import bag from '../../../assets/image/bag.png'
import Rectangle from '../../../assets/image/Rectangle 605.png'
import shape from '../../../assets/image/Shape.png'
import Total from '../Total/Total'
import {  useSelector } from "react-redux";
// import { setProducts } from "../../../configs/redux/actions/productsActions";
// import { addTodolist } from "../../../configs/redux/actions/cartAction";
// import axios from "axios"
import {FormatRupiah} from "@arismun/format-rupiah"


const Bag = () => {

  const [count, setCount] = useState(1); 
  const handleSum = () => {
    setCount(count+1)
  }
  const handleMin = () => {
    setCount(count-1)
  }
  const { data } = useSelector((state) => state.todo);
 let result = data.reduce(function (tot, arr) {
   return (tot + arr.data.price)*count;
 }, 0);
  return (
    <div className="container bag-my">
      <h3 className="title-bag">My Bag</h3>
      <div className="row ">
        <div className="col-lg-8 pl-lg-0">
          <div className="card mb-3 select-all">
            <div className="table-responsive-sm">
              <table className="table mt-3">
                <tbody>
                  <td className="me-5">
                    <div className="check-select">
                      <label className="customcheck ms-2">
                        <p className="select-item ms-4">
                          Select all items{" "}
                          <span className="text-secondary">
                            ({data.length} items selected)
                          </span>{" "}
                        </p>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <span className="checkmak"></span>
                      </label>
                    </div>
                  </td>
                  <td className="delete text-right">Delete</td>
                </tbody>
              </table>
            </div>
          </div>
          {data.length > 0 && (
            <ul>
              {data.map((item, index) => (
                <div className="card mb-3 " key={index}>
                  <div className="table-responsive-sm">
                    <table className="table">
                      <tbody>
                        <td className="align-middle">
                          <div className="check ms-2 mt-2">
                            <label className="customcheck mt-2 input">
                              <input
                                className="form-check-input "
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                              />
                              <span className="checkmark"></span>
                            </label>
                          </div>
                        </td>
                        <td className="align-middle  float-start">
                          <img
                            className="img-products"
                            src={item.data.image}
                            alt="product"
                          />
                        </td>
                        <td className="align-middle float-start">
                          <p className="post mb-1">{item.data.name}</p>
                          <span className="text-secondary sub-post">
                            {item.data.merk}
                          </span>
                        </td>
                        <td className="align-middle">
                          <tr>
                            <button
                              className="btn btn-secondary min"
                              onClick={handleMin}
                            >
                              <img
                                src={Rectangle}
                                alt=""
                                className="icon-min"
                              />
                            </button>
                          </tr>
                        </td>
                        <td className="align-middle one">{count}</td>
                        <td className="align-middle">
                          <tr>
                            <button
                              className="btn btn-light max"
                              onClick={handleSum}
                            >
                              <img src={shape} alt="" className="icon-max" />
                            </button>
                          </tr>
                        </td>
                        <td className="align-middle price">
                          <FormatRupiah value={item.data.price * count} />
                        </td>
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </ul>
          )}
          {data.length < 1 && <h1>Sorry Data Empty</h1>}
        </div>
        <Total totalPrice="Total Price" priceBag={<FormatRupiah value={result}/> } />
      </div>
    </div>
  );
}

export default Bag;
