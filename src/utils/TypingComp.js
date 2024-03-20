import { useState, useEffect } from "react";
import styled from 'styled-components';
import media from '../styles/media';
import colors from '../styles/colors';
import text from '../styles/text';

const TypingComp = ({ children }) => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length >= 3) {
          return "";
        }
        return "." + prevDots;
      });
    }, 400);

    return () => clearInterval(timer);
  }, []);

  return (
    <Wrapper>
      <SearchingMessage>
      Searching <Em> { children }</Em> for meta data
        <Dots id="dots"> {dots} </Dots>{" "}
      </SearchingMessage>
    </Wrapper>
  );
};
export default TypingComp;
const Em= styled.em`
${text.bodyMBold}
font-style: italic;
`
const Dots = styled.p`
position: absolute;
${text.bodyMBold}
margin: unset;
bottom:1%;
left:101%;
`
const SearchingMessage = styled.p`
${text.bodyM}
margin: unset;
`
const Wrapper = styled.div`
position: relative;
display: flex;
align-items: start;
justify-content: center;
width: fit-content;
`