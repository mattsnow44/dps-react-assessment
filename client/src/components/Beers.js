import React from 'react';
import { Header, Card, Container, Button } from 'semantic-ui-react';
import axios from 'axios';

class Beers extends React.Component {
  state = { page: 1, totalPages: 0, beers: [] }

  componentDidMount() {
  axios.get('api/all_beers?page=1&per_page=10')
    .then( res => {
      this.setState({ page: res.data.page, totalPages: res.data.total_pages, beers: res.data.entries })
    })
}

  nextPage = () => {
    const page = this.state.page + 1
    axios.get(`/api/all_beers?page=${page}&per_page=10`)
      .then( res => {
        this.setState({ page: res.data.page, beers: res.data.entries })
      })
  }

  prevPage = () => {
    const page = this.state.page - 1
    axios.get(`/api/all_beers?page=${page}&per_page=10`)
      .then( res => {
        this.setState({ page: res.data.page, beers: res.data.entries })
      })
  }

  render() {
    let {beers, page, totalPages} = this.state
    return (
      <Container>
        <Header as='h1' color='green' textAlign='center'>
          Beers page {page} of {totalPages}
          <div>
           <Button
             content='Previous Page'
             color='green'
             inverted
             icon='angle double left'
             labelPosition='left'
             onClick={this.prevPage}
           />
           <Button
             content='Next Page'
             color='green'
             inverted
             icon='angle double right'
             labelPosition='right'
             onClick={this.nextPage}
           />
          </div>
        </Header>
        <Card.Group itemsPerRow={1}>
          { beers.map( beer =>
            <Card key={beer.id}>
              <Card.Content>
                <Card.Header as='h3'>
                  {beer.name}
                </Card.Header>
                <Card.Description>
                  {beer.description}
                </Card.Description>
                <Card.Meta>
                  ABV: {beer.abv} IBU: {beer.ibu}
                </Card.Meta>
              </Card.Content>
            </Card>
          )}
        </Card.Group>
      </Container>
    )
  }
}


export default Beers;
