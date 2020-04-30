import React, {Component} from 'react';
import FaceBio from './components/FaceBio/FaceBio'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import './App.css';
import FaceDetection from './components/FaceDetection/FaceDetection'
import Clarifai from 'clarifai'

// creating an instance of Clarifai 
const app = new Clarifai.App({
 apiKey: 'YOUR CLARIFAI API KEY'
});

let rank = 1;

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      input: '',
      imageUrl: '',
      boxes: [],
      bios: [],
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
      const image = document.getElementById('image');
      const width = Number(image.width);
      const height = Number(image.height);

      return {
        leftCol: faceBox.left_col * width,
        rightCol: width - (faceBox.right_col * width),
        topRow: faceBox.top_row * height,
        bottomRow: height - (faceBox.bottom_row * height)
      }    
    })
    return clarifaiFaces;
      
    

  }


  faceBioDetection = (data) => {
    return data.outputs[0].data.regions.map(facesbio => {
      const bios = facesbio.data.concepts;
      const genders = bios.filter(element => element.vocab_id === "gender_appearance");
      const appearances = bios.filter(element => element.vocab_id === "multicultural_appearance")
      const ages = bios.filter(element => element.vocab_id === "age_appearance")
      const age = ages[0].name;
      const gender = genders[0].name;
      const appearance = appearances[0].name;

      return {
        age,
        gender,
        appearance
      }      
    })
  }

  displayFaceBio = (bios) => {
    this.setState({bios})
  }
  incrementRank = () => {
    this.setState({rank: rank++});
  }

  displayFaceBox = (faceBoxes) => {
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
      this.displayFaceBio(this.faceBioDetection(response));
      this.incrementRank(); 
    })
    .catch(err => console.log(err)); 
    
  }
  render (){
    return (
      <div className="App">
        <section className="section-book">
              <div className="row">
                <div  className="col-1-of-4">&nbsp;</div>
                <div  className="col-2-of-4">
                  <FaceBio facesBio={this.state.bios}/>
                </div>
                <div  className="col-1-of-4">&nbsp;</div>
              </div>
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
