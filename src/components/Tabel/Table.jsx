import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Table.css";
import loadinAni from "../Loading/Loading.json";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import Lottie from "react-lottie";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
const Table = () => {
  const [usersdata, setuserdata] = useState([]);
  const [loading, setloading] = useState(false);
  const [modal, setmodal] = useState(false);
  const [data, setdata] = useState({});
  const loadingoption = {
    loop: true,
    autoplay: true,
    animationData: loadinAni,
    rendererSettings: {
      preserverAspectRatio: "xMidYMid slice",
    },
  };
  const handleform = (e) => {
    const { value, name } = e.target;

    setdata({
      ...data,
      [name]: value,
    });
  };

  let submitdata = (e) => {
    e.preventDefault();

    axios
      .patch(`https://addressbackend.onrender.com/address/${data._id}`, {
        name: data.name,
        contact: data.contact,
        country: data.country,
        city: data.city,
        email: data.email,
        state: data.state,
        postal: data.postal,
      })
      .then((res) => getdata())
      .catch((err) => console.log(err));
    setmodal(false);
  };
  useEffect(() => {
    setloading(true);
    getdata();
  }, []);
  const getdata = () => {
    axios
      .get("https://addressbackend.onrender.com/address")
      .then((res) => (setuserdata(res.data.data), setloading(false)))
      .catch((err) => console.log(err));
  };
  const deletet = (id) => {
    axios
      .delete(`https://addressbackend.onrender.com/address/${id}`)
      .then((res) => getdata())
      .catch((err) => {
        console.error(err);
      });
  };

  const edit = (id) => {
    setmodal(!modal);
    const findone = usersdata.find((e) => e._id === id);
    setdata({
      city: findone.city,
      contact: findone.contact,
      country: findone.country,
      email: findone.email,
      name: findone.name,
      postal: findone.postal,
      state: findone.state,
      _id: findone._id,
    });
  };

  // console.log(usersdata);
  return (
    <div>
      <Modal size="lg" isOpen={modal} toggle={() => setmodal(!modal)}>
        <ModalHeader toggle={() => setmodal(!modal)}>
          Edit User Info
        </ModalHeader>
        <ModalBody>
          <form action="" onSubmit={submitdata}>
            <Row>
              <Col lg={12}>
                <div>
                  <label htmlFor="Name">Name</label>
                  <input
                    value={data.name}
                    onChange={handleform}
                    name="name"
                    type="text"
                    className="form-control"
                    placeholder="Enter Name"
                    required={true}
                  />
                  <label htmlFor="Email">Email</label>
                  <input
                    value={data.email}
                    onChange={handleform}
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="Enter Email"
                    required={true}
                  />
                  <label htmlFor="Country">Country</label>
                  <input
                    value={data.country}
                    onChange={handleform}
                    name="country"
                    type="text"
                    className="form-control"
                    placeholder="Enter Country"
                    required={true}
                  />
                  <label htmlFor="City">City</label>
                  <input
                    value={data.city}
                    onChange={handleform}
                    name="city"
                    type="text"
                    className="form-control"
                    placeholder="Enter City"
                    required={true}
                  />
                  <label htmlFor="State">State</label>
                  <input
                    value={data.state}
                    onChange={handleform}
                    name="state"
                    type="text"
                    className="form-control"
                    placeholder="Enter State"
                    required={true}
                  />
                  <label htmlFor="Contact">Contact</label>
                  <input
                    value={data.contact}
                    onChange={handleform}
                    name="contact"
                    type="number"
                    required={true}
                    className="form-control"
                    placeholder="Enter Contact"
                  />
                  <label htmlFor="Postal">ZIP / Postal</label>
                  <input
                    value={data.postal}
                    onChange={handleform}
                    name="postal"
                    type="number"
                    className="form-control"
                    placeholder="Enter State"
                    required={true}
                  />
                  <input type="submit" className="form-control" />
                </div>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Country</th>
            <th>City</th>
            <th>State</th>
            <th>Contact</th>
            <th>Postal/zip</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>

        <tbody>
          {usersdata?.map((e) => (
            <tr key={e._id}>
              <td data-column="First Name">{e.name}</td>
              <td data-column="Email">{e.email}</td>
              <td data-column="Country">{e.country}</td>
              <td data-column="City">{e.city}</td>
              <td data-column="State">{e.state}</td>
              <td data-column="Contact">{e.contact}</td>
              <td data-column="Postal">{e.postal}</td>
              <td data-column="Delete">
                <button
                  onClick={() => {
                    deletet(e._id);
                  }}
                  className="button-30"
                  role="button"
                >
                  <MdDelete></MdDelete>
                </button>
              </td>
              <td data-column="Edit">
                <button
                  onClick={() => {
                    edit(e._id);
                  }}
                  className="button-30"
                  role="button"
                >
                  <AiFillEdit></AiFillEdit>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && (
        <Lottie options={loadingoption} height={300} width={300}></Lottie>
      )}
    </div>
  );
};

export default Table;
