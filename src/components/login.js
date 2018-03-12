import React from "react";
import {Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
//css goes here

const Login = () => {
    return (
      <div classname="Login">
        {/* <form>
          <FormGroup controlId="email" bsSize
        </form> */}
        <Button
            block
            bsSize="large"
            type="submit">
            Login
          </Button>
      </div>
    )
}

// export function validateform()

export default Login;
