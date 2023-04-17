import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';

import BreedList from './components/BreedList';

function App() {
  const [imgUrl, setImgUrl] = useState(false)
  const [breedList, setBreedList] = useState({})

  useEffect(() => {
    async function fetchBreeds() {
      const { message: breeds } = await fetch('http://localhost:8080/api/get-breeds-list')
        .then(response => response.json())
      setBreedList(breeds)
    };
    fetchBreeds();
  }, []);

  async function getRandomDog () {
    const { message: url } = await fetch('http://localhost:8080/api/get-random-dog')
      .then(response => response.json())
    setImgUrl(url)
  }

  return (
    <div style={{padding: 10}}>
      <h1 style={{fontFamily: "Roboto"}}>Dogs!</h1>
      <div style={{ marginBottom: 20 }}>
        <Accordion disabled={Object.keys(breedList).length === 0}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Dog Breeds</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <BreedList breeds={breedList} />
          </AccordionDetails>
        </Accordion>
      </div>
      <div style={{ display: "fles", alignContent: "flex-start", flexWrap: "wrap", alignItems: "flex-start", flexDirection: "column" }}>
        <div>
          <Button variant="contained" onClick={() => getRandomDog()}>Get random dog image!</Button>
          <Button onClick={() => setImgUrl(false)} style={{ marginLeft: 5 }}>
            <CloseIcon />
          </Button>
        </div>
      </div>
      {imgUrl && 
        <div style={{ marginTop: 20 }}>
          <img style={{ maxWidth: "100%", height: "auto" }} src={imgUrl} alt="Dog Image" />
        </div>
      }
         <div>
    </div>
    </div>
  );
}

export default App;