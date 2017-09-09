import React from 'react';

import Section from 'grommet/components/Section';
// import Heading from 'grommet/components/Heading';
import Hero from 'grommet/components/Hero';
import Box from 'grommet/components/Box';
import Image from 'grommet/components/Image';
import Card from 'grommet/components/Card';

// import Table from 'grommet/components/Table';
// import TableRow from 'grommet/components/TableRow';


import personImg from './assets/person.jpg';

class Person extends React.PureComponent {
  constructor(...args) {
    super(...args);

    this.state = {
      personId: this.props.match.params.id,
      personData: '',
      homePlanet: '',
    };
    this.apiUrl = 'https://swapi.co/api/people';
  }

  componentWillMount() {
    window
      .fetch(`${this.apiUrl}/${this.state.personId}`)
      .then(res => res.json())
      .then((json) => {
        this.setState({ personData: json });
        this.getHomePlanet(json.homeworld);
      });
  }
  getHomePlanet(planetUrl) {
    window
      .fetch(planetUrl)
      .then(response => response.json())
      .then(json => this.setState({ homePlanet: json }));
  }

  render() {
    console.log('PersonData', this.state);
    return (
      <Section>
        <Hero
          background={<Image
            src={personImg}
            fit="cover"
            full
          />}
          backgroundColorIndex="dark"
          size="large"
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
              <Box colorIndex="grey-2-a">
                <Card
                  description={<div><br />
                    <p>Birth year: {this.state.personData.birth_year}</p>
                    <p>Mass: {this.state.personData.mass}</p>
                    <p>Eye color: {this.state.personData.eye_color}</p>
                    <p>Home planet: {this.state.homePlanet.name}</p>
                  </div>
                  }
                  label={this.state.personData.name}
                />
              </Box>

            </Box>
          </Box>
        </Hero>

      </Section>
    );
  }
}

export default Person;
