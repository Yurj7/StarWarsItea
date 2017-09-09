import React from 'react';
import Footer from 'grommet/components/Footer';
import Anchor from 'grommet/components/Anchor';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Paragraph from 'grommet/components/Paragraph';
import Menu from 'grommet/components/Menu';



class GrommetFooter extends React.PureComponent {
  render() {
    return (

      <Footer justify="between">
        <Box
          direction="row"
          align="center"
          pad={{ between: 'medium' }}
        >
          <Paragraph margin="none">
                    © 2017 Yurj React0209
          </Paragraph>
          <Menu
            direction="row"
            size="small"
            dropAlign={{ right: 'right' }}
          >
            <Anchor path={{ path: '/', index: true }}>Home </Anchor>
            <Anchor path={{ path: '/people', index: true }}>People </Anchor>
            <Anchor path={{ path: '/planets', index: true }}>Planets </Anchor>
            <Anchor path={{ path: '/species', index: true }}>Species </Anchor>
            <Anchor path={{ path: '/vehicles', index: true }}>Vehicles </Anchor>
          </Menu>
        </Box>
      </Footer>
    );
  }
}

export default GrommetFooter;
