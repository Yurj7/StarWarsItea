import React from 'react';
import { withRouter } from 'react-router-dom';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Search from 'grommet/components/Search';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';


class SearchHeader extends React.PureComponent {
  constructor(...args) {
    super(...args);

    this.state = {
      currentResource: 'people',
      resourceTypes: [],
      searchText: '',
    };

    this.onHeaderSearch = this.onHeaderSearch.bind(this);
  }
  componentWillMount() {
    window
      .fetch('https://swapi.co/api/')
      .then(res => res.json())
      .then((json) => {
        console.log(json);
        this.setState({ resourceTypes: Object.keys(json) });
      });
  }
  onHeaderSearch(e) {
    const search = e.target.value;
    this.setState({ searchText: search });
    const { currentResource } = this.state;
    console.log(this.state);
    this.props.history.replace(`/search/${currentResource}/${search}`);
  }
  setResource(resource) {
    this.setState({ currentResource: resource });
    console.log('Method of Resource', resource);
  }
  get menu() {
    const { resourceTypes } = this.state;
    console.log('ResourceTyoes', this.state.resourceTypes);
    return (<Menu dropAlign={{ right: 'right' }} inline={false}>
      {resourceTypes.map(resource =>
        (<Anchor
          key={resource}
          label={resource}
          className="swapi-menu-item"
          onClick={() => {
            this.setResource(resource);
            this.props.history.replace(`/search/${resource}/${this.state.searchText}`);
          }}
        >
          <Heading>
            {resource}
          </Heading>
        </Anchor>),

      )}
    </Menu>);
  }

  search(searchQuery) {
    const { currentResource } = this.state;
    console.log(this.state);
    this.props.history.replace(`/search/${currentResource}/${searchQuery} || ''`);
    this.state.searchText = searchQuery;
  }


  render() {
    console.log(this.state.searchText);
    return (
      <Header>

        <Title>
          {this.state.currentResource}
          <Anchor path={{ path: '/', index: true }}>Home </Anchor>
          {this.state.searchText}

        </Title>
        <Box
          flex
          justify="end"
          direction="row"
          responsive={false}
        >
          <Search
            inline
            fill
            size="medium"
            placeHolder="Search"
            dropAlign={{ right: 'right' }}
            // onChange ={this.onHeaderSearch}
            onDOMChange={this.onHeaderSearch}

            // onDOMChange={(e) =>{console.log("ccc",e.target.value);
            // this.setState({searchText:e.target.value})}  }
            // onKeyDown={this.onHeaderSearch}
          />
          { this.menu}
        </Box>
      </Header>
    );
  }
}

export default withRouter(SearchHeader);
