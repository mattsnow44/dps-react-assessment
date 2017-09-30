import React from 'react';
import { Header, Card, Container, Image, Feed } from 'semantic-ui-react';
import axios from 'axios';

class Breweries extends React.Component {
  state = { breweries: [] }

  componentDidMount() {
  axios.get('api/all_breweries')
    .then( res => {
      this.setState({ breweries: res.data.entries })
    })
}
  render() {
    return (
      <Container>
        <Header as='h1' color='green' textAlign='center'>
          Breweries
        </Header>
        <Card.Group itemsPerRow={3}>
          { this.state.breweries.map( brewery => {
            let { id,
              name,
              established,
              description,
              images = {"medium": "https://static1.squarespace.com/static/51b75a21e4b0d3389493d5b4/t/51ca6598e4b0898df4bf2b3f/1372218879896/beersensoryscience.jpg"}, 
              website
            } = brewery;
            return(
              <Card key={id}>
                <Image src={images.medium} />
                <Card.Content>
                  <Card.Header>
                    {name}
                  </Card.Header>
                  <Card.Meta>
                    <span className='date'>
                      Established: {established}
                    </span>
                  </Card.Meta>
                  <Card.Description>
                    {description}
                  </Card.Description>
                </Card.Content>
              </Card>
            )}
          )}
        </Card.Group>
      </Container>
    )
  }
}


export default Breweries;
