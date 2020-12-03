import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import './App.css';
import Image from './components/Image';

const Container = styled.div`
  width: 100%;


`;


const Navigation = styled.nav`
  background-color: #333333;
  color: #fff;
  transition: bottom 0.3s;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 999;

`;


const NavItem = styled.div`
  text-align: center;

`;


const ImagesWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 5em;
  overflow: hidden;

`;

const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 1em;
  padding: 1px 4px;
  font-size: 2em;
  color: #fff;
  background-color: #20a0b1;
  outline: none;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  

`;

const App = () => {

  //const imagesWrapper = useRef<HTMLHeadingElement>(null);
 

  let [imageWidth, setImageWidth] = useState<any>(250);
  let [imageHeight, setImageHeight] = useState<any>(250);
  let [blurAmount, setBlurAmount] = useState<any>(0);
  let [grayScale, setGrayScale] = useState<any>("false");
  let [images, setImages] = useState<any>([]);
  let [loading, setLoading] = useState(false);
  let [page, setPage] = useState(1);
  let [isFetching, setIsFetching] = useState(false);
  let [author, setAuthor] = useState();
  let [url, setUrl] = useState();



  let updateWidth = (e: React.FormEvent<HTMLInputElement>): void => {
    console.log(imageWidth);
    setImageWidth(e.currentTarget.value);
  }

  let updateHeight = (e: React.FormEvent<HTMLInputElement>): void => {
    console.log(imageHeight);
    setImageHeight(e.currentTarget.value);
    
  }


  let updateBlur = (e: React.FormEvent<HTMLInputElement>): void => {
    console.log(blurAmount);
    setBlurAmount(e.currentTarget.value);
   
  }



  let updateGrayScale = (e: React.FormEvent<HTMLInputElement>): void => {
    console.log(grayScale);
    setGrayScale(e.currentTarget.value)
  }


  let getData = () => {
    setLoading(true)
    axios.get(`https://picsum.photos/v2/list?page=1&limit=30`)
      .then(res => {
        console.log('Response data', res.data);
        setImages(res.data);
        setIsFetching(false)
      })
      .catch(err => {
        console.log('Something happend wrong');
      })
      .finally(() => {
        setLoading(false);
      })

  }

  let getMoreData = () => {
    axios.get(`https://picsum.photos/v2/list?page=${page}&limit=30`)
      .then(res => {
        console.log('Loaded more data', res.data);
        setImages([...images, ...res.data]);
        setPage(page + 1);
        setIsFetching(false)
      })
      .catch(err => {
        console.log('Something happend wrong');
      })
      .finally(() => {
        setLoading(false);
      })
  }



  useEffect(() => {

    if (page === 1) {
      getData();
    }

    window.addEventListener("scroll", () => { 


      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) {
        return;
      }
      else {
        //console.log("scrolling down");
        setIsFetching(true)
      }
    })


    if (isFetching) {
      //console.log("Fetch data")
      getMoreData();
    }






  }, [setImages, setLoading, isFetching]);





  return (
    <Container>
      <Navigation >
        <NavItem>
          <label htmlFor="imageWidth">Image width:</label>
          <br />
          <input min="100" max="500" step="10" type="range" onChange={updateWidth} value={imageWidth} />
        </NavItem>

        <NavItem>
          <label htmlFor="imageHeight">Image height:</label>
          <br />
          <input id="imageHeight" min="100" max="500" step="10" type="range" onChange={updateHeight} value={imageHeight} />

        </NavItem>

        <NavItem>
          <label htmlFor="blur">Blur:</label>
          <br />
          <input id="blur" min="0" max="10" step="1" type="range" onChange={updateBlur} value={blurAmount} />

        </NavItem>

        <NavItem>
          Gray Scale:
        <br />
          <label htmlFor="YES">YES</label>
          <input type="radio" id="YES" name="grayscale" onChange={updateGrayScale}
            value="true"
            checked={grayScale === "true"}
          />
          <label htmlFor="NO">NO</label>
          <input type="radio" id="NO" name="grayscale" onChange={updateGrayScale}
            value="false"
            checked={grayScale === "false"}
          />
        </NavItem>


        {/* <div className="col">
      <p>Image Width: {imageWidth}</p>
      <p>Image Height: {imageHeight}</p>
      <p>Blur Amount: {blurAmount}</p>
      <p>Gray Scale: {grayScale}</p>
      </div> */}
      </Navigation>


      <ImagesWrapper>

        {images.map((img, index) => {

          return (

            <div>

              <Image 
              key={index} 
              imageUrl={img.download_url} 
              imageWidth={imageWidth} 
              imageHeight={imageHeight} 
              blurAmount={blurAmount} 
              grayScale={grayScale} 
              url={img.url}
              author={img.author}
              />
              

            </div>





          )




        })}


             

      </ImagesWrapper>

      

      <ScrollToTopButton onClick={() =>document.documentElement.scroll({top: 0, behavior: 'smooth'})} title="Go to top"><i className="fa fa-angle-up"></i></ScrollToTopButton>

      <h3 hidden={!loading} style={{ textAlign: "center", display: 'block' }} >Loading...</h3> 
    </Container>


  );


}

export default App;
