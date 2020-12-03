import * as React from 'react';
import styled, { keyframes } from 'styled-components';

export interface IImageProps {
    imageUrl: string;
    imageWidth: number;
    imageHeight: number,
    blurAmount: number,
    grayScale: string,
    author: string,
    url: string

}



const Overlay = styled.div`
 position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: .5s ease;
  background-color: #008CBA;
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
    
`;


const ImageWrapper = styled.div`
   overflow:hidden;
   height: auto;
   position: relative;
   margin: 0.5em;
    &:hover ${Overlay} {
        opacity: 0.8;
    }

`;

const fadeIn = keyframes`
    0% {opacity:0;}
    100% {opacity:1;}
`;

const Img = styled.img`
  animation: ${fadeIn} ease 1s;
  z-index: -1;
  display: block;
  width: 100%;
  height: auto;
  border-radius: 1em;
`;

const CardTitle = styled.span`
    display: block;
    color: #fff;
    opacity: 1;
`;

const CardLink = styled.a`
    display: block;
    color: #fff;
    opacity: 1;
`;


export default function Image(props: IImageProps) {

    let createCustomLink = (imageLink): string => {

        let newLinkArr = imageLink.split('/');
        let newLink = '';

        newLinkArr[newLinkArr.length - 1] = props.imageHeight;
        newLinkArr[newLinkArr.length - 2] = props.imageWidth;

        newLinkArr.forEach((item, index) => {

            if (index !== 0) {
                newLink += '/' + item
            } else {
                newLink += item
            }

        });


        if (props.grayScale === 'true') {
            newLink += '/?grayscale';
        }


        if (props.blurAmount > 0 && props.grayScale === 'true') {
            newLink += '&blur=' + props.blurAmount
        }

        if (props.blurAmount > 0 && props.grayScale === 'false') {
            newLink += '/?blur=' + props.blurAmount
        }


        //console.log(newLink);

        return newLink

    }




    return (
        <ImageWrapper>
            <Img src={createCustomLink(props.imageUrl)} alt="Sorry, cant\'t display the image :(" />
            <Overlay>
                <CardTitle> {props.author}</CardTitle>
                <CardLink target="_blank" href={props.url}><i className="fa fa-external-link" aria-hidden="true"></i></CardLink>
            </Overlay>
        </ImageWrapper>
    );
}
