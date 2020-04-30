import React, {Component} from 'react';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import './App.css';
import FaceDetection from './components/FaceDetection/FaceDetection'
import Clarifai from 'clarifai'

// creating an instance of Clarifai 
const app = new Clarifai.App({
 apiKey: '6d0b41b28c784f46a39b27afee249e22'
});

let rank = 1;

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      input: '',
      imageUrl: '',
      boxes: [],
      rank: 0
    }
  }

  // 
  onImageLinkChange = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  // Use the response data from Clarifai api call to calculate face location in an image
  calculateFaceLocation = (data) => {
    const clarifaiFaces = data.outputs[0].data.regions.map(face => {
      const faceBox = face.region_info.bounding_box;
      const concepts = face.data.concepts;
      console.log(concepts);
      const image = document.getElementById('image');
      const width = Number(image.width);
      const height = Number(image.height);
      console.log(height, width);

      return {
        leftCol: faceBox.left_col * width,
        rightCol: width - (faceBox.right_col * width),
        topRow: faceBox.top_row * height,
        bottomRow: height - (faceBox.bottom_row * height)
      }
    })
    return clarifaiFaces;
      
    

  }

  incrementRank = () => {
    this.setState({rank: rank++});
    console.log(this.state.rank)
  }

  displayFaceBox = (faceBoxes) => {
    console.log(faceBoxes)
    this.setState({boxes: faceBoxes})
  }

  //Submit our image url to the Clarifai face detection model api
  onImageLinkSubmit = (event) => {
    event.preventDefault();
    this.setState({imageUrl: this.state.input})

    //Make request to the clarifai face detection model api endpoint
    app.models
    .predict(
      Clarifai.DEMOGRAPHICS_MODEL, 
      this.state.input)
    .then(response => {
      this.displayFaceBox(this.calculateFaceLocation(response)) 
      this.incrementRank(); 
      console.log(response);
    })
    .catch(err => console.log(err)); 
    
  }
  render (){
    return (
      <div className="App">
        <section className="section-book">
              <div className="row">
                  <div className="book">
                      <div className="book__form">
                          <ImageLinkForm 
                            
                            onImageLinkChange={this.onImageLinkChange}
                            onImageLinkSubmit={this.onImageLinkSubmit}
                            rank={this.state.rank}
                          />
                      </div>
  
                      <div className="detect-image">
                          <div>
                              <div className="u-margin-bottom-medium">
                                  <h2 className="heading-secondary">
                                      Experience the power of AI with Images
                                  </h2>
                              </div>
  
                              <FaceDetection faceBoxes={this.state.boxes} imageUrl={this.state.imageUrl}/>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
      </div>
    );
  }
  
}

export default App;
