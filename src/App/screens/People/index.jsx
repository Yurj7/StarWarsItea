import React from 'react';

import Section from 'grommet/components/Section';
import Tile from 'grommet/components/Tile';
import Box from 'grommet/components/Box';
import Meter from 'grommet/components/Meter';
import Card from 'grommet/components/Card';
import Anchor from 'grommet/components/Anchor';
import Tiles from 'grommet/components/Tiles';
import Value from 'grommet/components/Value';

import imgPeople from './assets/starPeople.jpeg';

class People extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      peopleData: [],
      loadedPeople: 0,
      totalPeople: 0,
    };
    this.apiUrl = 'https://swapi.co/api/people';
    this.loadMore = this.loadMore.bind(this);
  }
  componentWillMount() {
    window
      .fetch(`${this.apiUrl}`)
      .then(res => res.json())
      .then((json) => {
        this.setState({
          peopleData: json,
          loadedPeople: json.results.length,
          totalPeople: json.length,

        });
      });
  }

  get peopleTiles() {
    console.log('results', this.state.peopleData.results);
    return this.state.peopleData.results ?
      <Section>
        <Tiles
          onMore={this.state.peopleData.next ? this.loadMore : null}
          fill
        >
          {this.state.peopleData.results.map(item => (
            <Tile key={item.url}>
              <Anchor path={{ path: `/people/${item.url.split('/')[5]}`, index: true }}>
                <Card
                  thumbnail={imgPeople}
                  heading={item.name}
                />
              </Anchor>
            </Tile>
          ))}
        </Tiles>
        <Box align="center">
          <Value
            value={this.state.loadedPeople}
            size="small"
            align="start"
          />
          <Meter
            vertical={false}
            size="small"
            value={this.state.loadedPeople}
            max={this.state.totalPeople}
          />
        </Box>
      </Section>
      : null;
  }

  loadMore() {
    window
      .fetch(`${this.state.peopleData.next}`)
      .then(res => res.json())
      .then(json => this.setState({
        peopleData: {
          results: this.state.peopleData.results.concat(json.results),
          next: json.next,
        },
        loadedPeople: this.state.loadedPeople + json.results.length,
      },
      ));
  }

  render() {
    return (
      <div>
        {this.peopleTiles}
      </div>
    );
  }
}

export default People;
