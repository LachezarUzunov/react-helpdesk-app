import { useState, Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repass: "",
  });

  const { name, email, password, repass } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const {user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth);

  useEffect(() => {
    if(isError) {
        toast.error(message)
    }

    // Redirect when logged in
    if (isSuccess || user) {
        navigate('/')
    }
    dispatch(reset())
  }, [isError, isSuccess, user, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== repass) {
      toast.error("Passwords do not match");
    } else {
        const userData = {
            name,
            email,
            password
        }
        dispatch(register(userData))
    }
  };

  return (
    <Fragment>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Enter your name"
              required
            ></input>
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            ></input>
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter password"
              required
            ></input>
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="repas"
              name="repass"
              value={repass}
              onChange={onChange}
              placeholder="Confirm password"
              required
            ></input>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </Fragment>
  );
};

export default Register;
