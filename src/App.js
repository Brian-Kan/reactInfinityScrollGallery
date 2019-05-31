import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(){
    super();

    // Default/initial state for our application
    this.state = {
      images: [],
      imageGroup1: [],
      imageGroup2: [],
      imageGroup3: [],
      imageGroup4: [],
      imageGroup5: [],
      isLoading: true
    }
  }

componentDidMount(){
  
}

getPhotos = () => {
  axios( {
    method:'GET',
    url: 'https://pixabay.com/api/',
    dataResponse: 'jsonp',
    params: {
      key: '12624950-1e2c848ae9138ca54d5e56079'
      }
    })
    .then((result) => {
      // const images = result;
      const imageGroup1 = result.data.hits.slice(0, 4);
      const imageGroup2 = result.data.hits.slice(4, 8);
      const imageGroup3 = result.data.hits.slice(8, 12);
      const imageGroup4 = result.data.hits.slice(12, 16);
      const imageGroup5 = result.data.hits.slice(16);
      
      this.setState({
        images: result.data.hits,
        imageGroup1: imageGroup1,
        imageGroup2: imageGroup2,
        imageGroup3: imageGroup3,
        imageGroup4: imageGroup4,
        imageGroup5: imageGroup5,
        isLoading: false      
      });
      
      
  }).catch((err) => {
      console.log("The axios call failed", err)
  });
}

  componentDidUpdate(){
    /*This is most likely used for the infinite scroll*/
  }

  render(){
    console.log("this.state", this.state);
    return (
      <div className="App">
        <header>
          
          <h1>Random gallery generator. <br></br>Generate a random gallery.</h1>

          <button onClick={this.getPhotos}>Click me for pictures!</button>
          
        </header>
        <section className="gallery">

          {/* A function to populate images which are in divs....
          ....or should I just put 30 divs and have them append to the DOM?  Answer: MVP */

          /*
          * map over this.state.images
          * put the https link for the images in your <img> src
          */}
          


          { this.state.images.map( image => {
            return (
              <div className="imageSizer" key={image.largeImageURL}>
                { image.largeImageURL ? <img src={image.largeImageURL} alt={image.tags}/> : null}
              </div>
            )
          })}


          

        </section>
      </div>
    );
  }

  }

export default App;

// const imageMap = this.state.images.map( (image => image);

// const imageSlice1 = imageMap.slice(0, 4);
// const imageSlice2 = 




// { this.state.isLoading ? <p>Loading....👾</p> : this.state.images.map( (image) => {
//   return (
//     <section className="wrapper" key={image.largeImageURL}>
//       <div className="imageSet">

//         <div className="imageSizer">
//           <img src={image.largeImageURL}  alt={image.tags}/>
//         </div>

//       </div>
//     </section>
//     )
//   })
// }