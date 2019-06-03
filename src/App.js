import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(){
    super();

    // Default/initial state for our application
    this.state = {
      images: [],
      visibleImages: [],
 
      isLoading: true
    }
  }


    // function to do something (on scroll) when scrolled to the right point, get more images and update the state
  componentDidMount(){
    // code to register an event listener  (ex document.addEventListener like scroll and pass a functino to run when sroll happens)
    document.addEventListener('scroll',  (event) => {
      
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        // you're at the bottom of the page
        console.log("Scroll Test!");
        this.imageRendering()
      }
      
  
    }, true /*Capture event*/);
  
    }


  getPhotos = () => {
    axios( {
      method:'GET',
      url: 'https://pixabay.com/api/',
      dataResponse: 'jsonp',
      params: {
        key: '12624950-1e2c848ae9138ca54d5e56079',
        per_page: 200
        }
      })
      .then((result) => {

        
        this.setState({
          images: result.data.hits,
          isLoading: false      
        });
        this.imageRendering();
        console.log("Visible Images", this.state.visibleImages)
        
    }).catch((err) => {
        console.log("The axios call failed", err)
    });
  }


  imageRendering = () => {
    const imagesClone = this.state.images;
    const renImagesClone = this.state.visibleImages;
    
    for (let i = 0; i < 20; i++) {

      renImagesClone.push(imagesClone[0])
      imagesClone.shift()
    }
    this.setState({
      images: imagesClone,
      visibleImages: renImagesClone
    })

  }
  

  render(){
    
    return (
      <div className="App">
        <header>

          <div className="titleButtonContainer">
            <h1>Generate a random gallery.</h1>

            <button onClick={this.getPhotos}>Click me for pictures!</button>

            <button onClick={this.imageRendering}>Get MORE pictures!</button>

            <div onScroll={this.imageRendering}></div>  
          </div>
          
          
        </header>
        <section className="gallery">

          {/* A function to populate images which are in divs....
          ....or should I just put 30 divs and have them append to the DOM?  Answer: MVP */

          /*
          * map over this.state.images
          * put the https link for the images in your <img> src
          */}
          
          { this.state.visibleImages.map( image => {
            if (image !== undefined){   
              return (
                <div className="imageSizer" key={image === undefined ? console.log("Null Message") : image.largeImageURL}>
                  { image.largeImageURL ? <img src={image.largeImageURL} alt={image.tags}/> : null }
                </div>
              )
            }
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