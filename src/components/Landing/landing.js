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
        <FlipPage className="flipStyle">
          <article>
            <h1>My awesome first article that spans beyond the confines of its page and goes all the way to the next page</h1>
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
