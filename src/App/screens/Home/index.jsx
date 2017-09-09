import React from 'react';
import Hero from 'grommet/components/Hero';
import Image from 'grommet/components/Image';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';

import { Link } from 'react-router-dom';


import hero from './assets/starwars.png';


class Home extends React.PureComponent {
  render() {
    return (
      <Hero
        background={<Image
          src={hero}
          fit="cover"
          full
        />}
        backgroundColorIndex="dark"
      >
        <Box
          direction="row"
          justify="center"
          align="center"
        >
          <Box
            basis="1/2"
            align="end"
            pad="medium"
          />
          <Box
            basis="1/2"
            align="start"
            pad="medium"
          >
            <Heading margin="none">
              <Anchor path={{ path: '/', index: true }}>Feel the force </Anchor>
              {/*<Link to="/">  Feel the Force </Link>*/}
            </Heading>
          </Box>
        </Box>

      </Hero>

    );
  }
}

export default Home;
