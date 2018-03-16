import React from "react";
import FlipPage from "react-flip-page";
import Navigation from "../Navbar/navbar";



class Landing extends React.Component{
  // constructor(props){
  //   super(props);
  //
  //   this.state={
  //
  //   };
  // }



  render() {

    return(
      <div>
      <Navigation/>
        <FlipPage
          width="100%"
          height="900"
          orientation="horizontal"
          disableSwipe="FALSE"
          block>
          <article >
            <h1 className="col-sm-6">Welcome to Yummy recipies</h1>
            <h1 className="col-sm-6"> The basics of navigation shall be split between the two pages to mimic the pages of a book</h1>
          </article>
          <article className="col-sm-6">
            <h1>Welcome to Yummy recipies</h1>
            <p>My awesome first content</p>
          </article>
          <article>
            <h1>My wonderful second article</h1>
            <p>My wonderful second content</p>
          </article>
          <article>
            <h1>My excellent third article</h1>
            <p>My excellent third content</p>
          </article>
        </FlipPage>
        </div>
    );
  }
}

export default Landing;
