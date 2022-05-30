import React, { useState, useEffect } from "react";
import {useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../form/styleCreate.css";
import Profil from "../profil/Profil";

const EditProduct = () => {
    // const [name, setName] = useState('');
    // const [stock, setStock] = useState('');
    // const [price, setPrice] = useState('');
    // const [description, setDeskripsion] = useState("");
  
     const navigate = useNavigate();
     const [image, setImage] = useState("https://fakeimg.pl/350x200/");
     const [name, setName] = useState("");
     const [description, setDeskripsion] = useState("");
     const [stock, setStock] = useState("");
     const [price, setPrice] = useState("");
     const [typestock, setTypestock] = useState("");
     const [imagePreview, setImagePreview] = useState(
       "https://fakeimg.pl/350x200/"
     );
    const { id } = useParams();
      const onSubmit = (e) => {
      const data = new FormData();
      data.append("name", name);
      data.append("description", description);
      data.append("stock", stock);
      data.append("price", price);
      data.append("typestock", typestock);
      data.append("image", image);
        e.preventDefault();
        axios
          .put(`http://localhost:4000/v1/products/${id}`, data, {
            "content-type": "multipart/form-data",
          })
          .then((res) => {
            // console.log("post success", res);
            navigate("/productList");
          })
          .catch((err) => {
            console.log("err", err);
          });
    };
  // const handleRegister = (e) => {
  //   e.preventDefault();
  //   axios
  //     .put(`http://localhost:4000/v1/products/${id}`, dataRegister)
  //     .then((res) => {
  //       console.log(res.data);
  //       navigate("/productList");
  //     })
  //     .catch((e) => {
  //       // console.log(e);
  //       // console.log(e.response.data.message);
  //       alert(e.response.data.message);
  //     });
  // };
    useEffect(() => {
        getProductById();
    }, []);
 
    const onImageUpload = (e) => {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      console.log(URL.createObjectURL(file));
    };
  const getProductById = async () => {
    const response = await axios.get(`http://localhost:4000/v1/products/${id}`);
    console.log(response.data.data.image)
    setImagePreview(response.data.data.image);
    setName(response.data.data.name)
    setPrice(response.data.data.price)
    setStock(response.data.data.stock)
    setDeskripsion(response.data.data.description)
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="my-bag">
        <div className="row">
          <Profil />
          <div className="col-lg-7 profil-form">
            <div className="card mt-3">
              <div className="card-body">
                <h3 className="title-selling mt-2">Inventory</h3>
                <div className="line"></div>
                <div className="row mt-3 ms-1">
                  <div className="col-sm-8">
                    <div className="mb-3 row failed">
                      <label
                        for="Name"
                        className="col-sm-4 col-form-label text-secondary"
                      >
                        Name of goods
                      </label>
                      <input
                        id="floatingInput"
                        name="name"
                        type="text"
                        value={name}
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                        className="form-control form-control-lg ms-2 mt-2 name-input"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mt-3">
              <div className="card-body">
                <h3 className="title-selling mt-2">Item details</h3>
                <div className="line"></div>
                <div className="row mt-3 ms-1">
                  <div className="col-sm-8">
                    <div className="mb-3 row">
                      <label
                        for="Name"
                        className="col-sm-4 col-form-label text-secondary"
                      >
                        Unit price
                      </label>
                      <input
                        id="floatingPassword"
                        name="price"
                        type="number"
                        value={price}
                        placeholder="Price"
                        onChange={(e) => setPrice(e.target.value)}
                        className="form-control form-control-lg ms-2 mt-2 name-input"
                      />
                    </div>
                  </div>
                  <div className="col-sm-8">
                    <div className="mb-3 row">
                      <label
                        for="Name"
                        className="col-sm-4 col-form-label text-secondary"
                      >
                        Stock
                      </label>
                      <input
                        id="floatingPassword"
                        name="stock"
                        type="number"
                        value={stock}
                        placeholder="Stock"
                        onChange={(e) => setStock(e.target.value)}
                        className="form-control form-control-lg ms-2 mt-2 name-input"
                      />
                    </div>
                  </div>
                  <div className="col-sm-8 mt-3 mb-4">
                    <label
                      for="Name"
                      className="col-sm-12 col-form-label ms-2 mb-2 text-secondary"
                    >
                      Stock
                    </label>
                    <div className="stock-radio">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="typestock"
                        value="baru"
                        checked={typestock === "baru"}
                        onChange={(e) => setTypestock(e.target.value)}
                      />
                      <label
                        className="form-check-label text-secondaryms-2"
                        for="flexRadioDefault1"
                      >
                        baru
                      </label>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="typestock"
                        value="bekas"
                        checked={typestock === "bekas"}
                        onChange={(e) => setTypestock(e.target.value)}
                      />
                      <label
                        className="form-check-label text-secondary ms-2"
                        for="flexRadioDefault1 "
                      >
                        Bekas
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mt-3">
              <div className="card-body">
                <h3 className="title-selling mt-2">Photo of goods</h3>
                <div className="line"></div>
                <div className="row mt-3 ms-2 me-2 photo-form">
                  <div className="col-sm-3 ms-2 mt-3">
                    <div className="card card-image">
                      <img
                        src={imagePreview}
                        alt="Bootstrap"
                        className="img-fluid "
                      />
                      <div className="card-img-overlay text-white d-flex justify-content-center align-items-center">
                        <img src="../image/seling-product/box 5.png" alt="" />
                      </div>
                    </div>
                    <p className="text-center mt-2 text-secondary">
                      Foto utama
                    </p>
                  </div>
                  <div className="col-sm-2 mt-5 upload">
                    <div className="card">
                      <img
                        src={imagePreview}
                        alt="Bootstrap"
                        className="img-fluid"
                      />
                      <div className="card-img-overlay text-white d-flex justify-content-center align-items-center">
                        <img src="../image/seling-product/box 5.png" alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-2 mt-5 upload">
                    <div className="card ">
                      <img
                        src={imagePreview}
                        alt="Bootstrap"
                        className="img-fluid"
                      />
                      <div className="card-img-overlay text-white d-flex justify-content-center align-items-center">
                        <img src="../image/seling-product/box 5.png" alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-2 mt-5 upload">
                    <div className="card ">
                      <img
                        src={imagePreview}
                        alt="Bootstrap"
                        className="img-fluid"
                      />
                      <div className="card-img-overlay text-white d-flex justify-content-center align-items-center">
                        <img src="../image/seling-product/box 5.png" alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-2 mt-5 upload">
                    <div className="card ">
                      <img
                        src={imagePreview}
                        alt="Bootstrap"
                        className="img-fluid"
                      />
                      <div className="card-img-overlay text-white d-flex justify-content-center align-items-center">
                        <img src="../image/seling-product/box 5.png" alt="" />
                      </div>
                    </div>
                  </div>
                  <hr className="upload" />
                  <div className="text-center mb-3">
                    <input
                      onChange={(e) => onImageUpload(e)}
                      className="form-control btn btn-upload"
                      type="file"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="card mt-3">
              <div className="card-body">
                <h3 className="title-selling mt-2">Description</h3>
                <div className="line"></div>
                <div className="col-lg-12 mb-1 mt-4">
                  <div className="card">
                    <div className="card-body description">
                      <img
                        src="../image//seling-product/summernote.png"
                        alt=""
                      />
                      <div className="garis"></div>
                      <textarea
                        className="form-control"
                        id="floatingEmail"
                        name="description"
                        type="description"
                        value={description}
                        placeholder="description"
                        onChange={(e) => setDeskripsion(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <div className="col-sm-12 text-end">
                <button className="btn btn-jual" type="submit">
                  Jual
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

  export default EditProduct;
