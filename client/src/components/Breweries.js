import React from 'react';
import { Header, Card, Container, Image, Button, Modal } from 'semantic-ui-react';
import axios from 'axios';

class Breweries extends React.Component {
  state = { page: 1, totalPages: 0, breweries: [] }

  componentDidMount() {
  axios.get('api/all_breweries?page=1&per_page=9')
    .then( res => {
      this.setState({ page: res.data.page, totalPages: res.data.total_pages, breweries: res.data.entries })
    })
  }

  nextPage = () => {
    const page = this.state.page + 1
    axios.get(`/api/all_breweries?page=${page}&per_page=9`)
      .then( res => {
        this.setState({ page: res.data.page, breweries: res.data.entries })
      })
  }

  prevPage = () => {
    const page = this.state.page - 1
    axios.get(`/api/all_breweries?page=${page}&per_page=9`)
      .then( res => {
        this.setState({ page: res.data.page, breweries: res.data.entries })
      })
  }

  render() {
    let {breweries, page, totalPages} = this.state
    return (
      <Container>
        <Header as='h1' color='green' textAlign='center'>
          Breweries page {page} of {totalPages}
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
        <Card.Group itemsPerRow={3}>
          { this.state.breweries.map( brewery => {
            let { id,
              name,
              established,
              description = "This is a phenomenal brewery. You're going to be very pleased with the beer we send out. It's the best.",
              images = {"medium": "https://static1.squarespace.com/static/51b75a21e4b0d3389493d5b4/t/51ca6598e4b0898df4bf2b3f/1372218879896/beersensoryscience.jpg",
                        "square_medium": "https://pbs.twimg.com/profile_images/378800000793149446/8a397df4e74b39212a336b745343a39d.jpeg"},
              website,
            } = brewery;
            return(
              <Card key={id}>
                <Image src={images.medium} />
                <Card.Content>
                  <Card.Header>
                    {name}
                  </Card.Header>
                  <Card.Description>
                    {description}
                  </Card.Description>
                  <Modal trigger={<Button>More Info</Button>}>
                    <Modal.Header>{name}</Modal.Header>
                    <Modal.Content image >
                      <Image wrapped size='medium' src={images.square_medium} />
                      <Modal.Description>
                        <Header>About This Brewery</Header>
                        <p>{description}</p>
                        { website && <a href={website}>Website</a> }
                        <p/>
                        { established && <p>Established: {established}</p>}
                      </Modal.Description>
                    </Modal.Content>
                  </Modal>
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
