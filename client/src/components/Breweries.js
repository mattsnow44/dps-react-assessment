import React from 'react';
import { Header, Card, Container, Image, Button, Modal, Input } from 'semantic-ui-react';
import axios from 'axios';

class Breweries extends React.Component {
  state = { page: 1, totalPages: 0, breweries: [], searchTerm: '' }

  componentDidMount() {
    this.getBreweries()
  }

  getBreweries() {
    axios.get('api/all_breweries?page=1&per_page=9')
      .then( res => {
        this.setState({ page: res.data.page, totalPages: res.data.total_pages, breweries: res.data.entries })
      }
    )
  }

  nextPage = () => {
    const page = this.state.page + 1
    let searchTerm = this.state.searchTerm
    let apiCall = ''
    if(this.state.searchTerm === '') {
      apiCall = `/api/all_breweries?page=${page}&per_page=9`
    } else {
      apiCall = `/api/search_breweries?query=${searchTerm}&page=${page}&per_page=9`
    }
    axios.get(apiCall)
      .then( res => {
        this.setState({ page: res.data.page, breweries: res.data.entries })
      })
  }

  prevPage = () => {
    const page = this.state.page - 1
    let searchTerm = this.state.searchTerm
    let apiCall = ''
    if(this.state.searchTerm === '') {
      apiCall = `/api/all_breweries?page=${page}&per_page=9`
    } else {
      apiCall = `/api/search_breweries?query=${searchTerm}&page=${page}&per_page=9`
    }
    axios.get(apiCall)
      .then( res => {
        this.setState({ page: res.data.page, breweries: res.data.entries })
      })
  }

  apiSearch = (e) => {
    const searchTerm = e.target.value
    if(searchTerm === '') {
      this.getBreweries
    } else {
      axios.get(`/api/search_breweries?query=${searchTerm}&page=1&per_page=9`)
      .then(res => {
        this.setState({breweries: res.data.entries, totalPages: res.data.total_pages, searchTerm, page: 1})
      })
    }
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
          <div>
            <Input
              size='mini'
              placeholder="Search Breweries..."
              onChange={this.apiSearch}
              style={{margin: "0 auto", marginTop: "10px"}}
            />
          </div>
        </Header>
        <Card.Group doubling itemsPerRow={3}>
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
