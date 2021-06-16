import { Card, CardContent, CardHeader } from "@material-ui/core";
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import { BASE_URL, SIGN_IN, SIGN_UP } from "../api";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../Redux/Action";

const Auth = ({ loginPage, signPage }) => {
  const [formDetails, setFormDetails] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleFormChanges = (e) => {
    formDetails[e.target.name] = e.target.value;
    setFormDetails({ ...formDetails });
    error[e.target.name] = "";
    setError({ ...error });
  };

  const handleSignup = () => {
    if (!formDetails.first_name) {
      error["first_name"] = "This field is required!";
      setError({ ...error });
      return;
    }
    if (!formDetails.last_name) {
      error["last_name"] = "This field is required!";
      setError({ ...error });
      return;
    }
    if (!formDetails.email) {
      error["email"] = "This field is required!";
      setError({ ...error });
      return;
    }
    if (!formDetails.phone) {
      error["phone"] = "This field is required!";
      setError({ ...error });
      return;
    }
    if (!formDetails.password) {
      error["password"] = "This field is required!";
      setError({ ...error });
      return;
    }
    console.log(formDetails);

    if (
      !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
        formDetails.password
      )
    ) {
      error["password"] =
        "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number";
      setError({ ...error });
      return;
    }

    fetch(`${BASE_URL}/${SIGN_UP}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        user: { ...formDetails, phone: `+91${formDetails.phone}` },
        device_detail: {
          device_type: "web",
          player_id: "",
        },
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          dispatch(setCurrentUser(res.data?.user));
    setLoading(false)

        } else {
          alert(res.message);
    setLoading(false)

        }
      });
  };

  const handleLogin = () => {
    if (!formDetails.email) {
      error["email"] = "This field is required!";
      setError({ ...error });
      return;
    }
    if (!formDetails.password) {
      error["password"] = "This field is required!";
      setError({ ...error });
      return;
    }

    fetch(`${BASE_URL}/${SIGN_IN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        user: {
          email: formDetails.email,
          password: formDetails.password,
        },
        role: "patient",
        device_detail: {
          device_type: "web",
          player_id: "",
        },
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          dispatch(setCurrentUser(res.data?.user));
    setLoading(false)

        } else {
    setLoading(false)
    alert(res.message);
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(loading) return;
    setLoading(true);
    if (signPage) {
      handleSignup();
    } else {
      handleLogin();
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "calc(100vh - 65px)",
      }}
    >
      <Card
        style={{
          width: "90%",
          maxWidth: "450px",
        }}
      >
        <CardHeader
          className="bg-dark text-light text-center"
          title={signPage ? "Sign up" : "Login"}
        />
        <CardContent className="bg-light">
          <div className="text-center my-3">
            {signPage ? (
              <span>
                Already registered? <Link to="/login">Login</Link> here
              </span>
            ) : (
              <span>
                Not registered? <Link to="/signup">Signup</Link> here
              </span>
            )}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row mx-0">
              {signPage && (
                <div className="col-6 bg-white rounded shadow-sm my-1 p-2">
                  <TextField
                    size="small"
                    type="text"
                    label="First Name"
                    name="first_name"
                    value={formDetails.first_name}
                    onChange={handleFormChanges}
                    className="w-100 m-1"
                    variant="outlined"
                    error={error.first_name}
                    helperText={error.first_name}
                  />
                </div>
              )}
              {signPage && (
                <div className="col-6 bg-white rounded shadow-sm my-1 p-2">
                  <TextField
                    size="small"
                    type="text"
                    label="Last Name"
                    name="last_name"
                    value={formDetails.last_Name}
                    onChange={handleFormChanges}
                    className="w-100 m-1"
                    variant="outlined"
                    error={error.last_Name}
                    helperText={error.last_Name}
                  />
                </div>
              )}
              <div className="col-12 bg-white rounded shadow-sm my-1 p-2">
                <TextField
                  size="small"
                  type="email"
                  label="Email"
                  name="email"
                  value={formDetails.email}
                  onChange={handleFormChanges}
                  className="w-100 m-1"
                  variant="outlined"
                  error={error.email}
                  helperText={error.email}
                />
              </div>
              {signPage && (
                <div className="col-12 bg-white rounded shadow-sm my-1 p-2">
                  <TextField
                    size="small"
                    type="number"
                    label="Phone"
                    name="phone"
                    value={formDetails.phone}
                    onChange={handleFormChanges}
                    className="w-100 m-1"
                    variant="outlined"
                    error={error.phone}
                    helperText={error.phone}
                  />
                </div>
              )}
              <div className="col-12 bg-white rounded shadow-sm my-1 p-2">
                <TextField
                  size="small"
                  type="password"
                  label="Password"
                  name="password"
                  value={formDetails.password}
                  onChange={handleFormChanges}
                  className="w-100 m-1"
                  variant="outlined"
                  error={error.password}
                  helperText={error.password}
                />
              </div>
              <div className="col-12 text-right px-0 mt-2">
                <Button type="submit" variant="contained" color="primary">
                  {!loading ? signPage ? "Sign up" : "Login": "Loading..."}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
