import React from 'react';
import { Header, Card, Container } from 'semantic-ui-react';
import axios from 'axios';

class Beers extends React.Component {
  state = { totalPages: 0, beers: [] }

  componentDidMount() {
  axios.get('api/all_beers')
    .then( res => {
      this.setState({ totalPages: res.data.total_pages, beers: res.data.entries })
    })
}
  render() {
    let {beers, totalPages} = this.state
    return (
      <Container>
        <Header as='h1' color='green' textAlign='center'>
          Beers
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
