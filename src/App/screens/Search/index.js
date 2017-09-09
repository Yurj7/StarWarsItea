import React from 'react';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Card from 'grommet/components/Card';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Meter from 'grommet/components/Meter';
import Value from 'grommet/components/Value';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchType: props.match.params.type,
      searchQuery: props.match.params.query,
      searchResult: {},
      loadedResults: 0,
      totalResults: 0,

    };
    this.onTilesMore = this.onTilesMore.bind(this);
  }
  componentDidMount() {
    const { params } = this.props.match;
    this.search(params.type, params.query);
  }

  componentWillReceiveProps(nextProps) {
    const { params } = nextProps.match;
    this.setState({
      searchType: params.type,
      searchQuery: params.query,
      searchResult: {},

    }); this.search(this.state.searchType, this.state.searchQuery);
  }

  search(type, query) {
    window
      .fetch(`https://swapi.co/api/${type}/?search=${query}`)
      .then(res => res.json())
      .then((json) => {
        console.log('Run Search query!!!!', json);
        this.setState({ searchResult: json });

      // .then(json => this.onSearchResult(json));
      });
  }

  onTilesMore() {
    window
      .fetch(`${this.state.searchResult.next}`)
      .then(res => res.json())
      .then(json => this.setState({
        searchResult: {
          results: this.state.searchResult.results.concat(json.results),
          next: json.next,
        },
        loadedResults: this.state.loadedResults + json.results.length,
      },
      ));
  }

  get displayResults() {
    console.log('results', this.state.searchResult);
    return this.state.searchResult.results ?
      <section>
        <Tiles
          fill
          onMore={this.state.searchResult.next ? this.onTilesMore : null}
        >{
            this.state.searchResult.results.map(
              item =>
                (<Tile key={item.url}>
                  {/* <Anchor path={{ path: `/people/${item.url.split('/')[5]}`, index: true }}> */}
                  <Card
                    thumbnail="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5MGo2wD5aG1Hsc-HDvPaajPuv50eAX5bbszi73fKTfrA29yFx"
                    heading={item.name}
                    label={item.type}
                  />
                  {/* </Anchor> */}
                </Tile>),
            )
          }</Tiles>
        <Box align="center">
          <Value
            value={this.state.loadedResults}
            size="small"
            align="start"
          />
          <Meter
            vertical={false}
            size="small"
            value={this.state.loadedResults}
            max={this.state.totalResults}
          />
        </Box>
      </section>
      : null;
  }


  render() {
    return (
      <section>
        <p> SearchType: {this.state.searchType}</p>
        <p> SearchQuery: {this.state.searchQuery}</p>
         SearchResult Length: {this.state.searchResult.count}
        {this.displayResults}
      </section>
    );
  }
}


export default Search;
