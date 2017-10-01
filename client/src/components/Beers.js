import React from 'react';
import { Header, Card, Container, Button, Modal } from 'semantic-ui-react';
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
          { beers.map( beer => {
            let { id,
              name,
              ibu,
              abv,
              style = {},
              description,
            } = beer;
            return (
            <Card key={id}>
              <Card.Content>
                <Card.Header as='h3'>
                  {name}
                </Card.Header>
                <Card.Description>
                  {description}
                </Card.Description>
                <Modal trigger={<Button>More Info</Button>}>
                  <Modal.Header>{name}</Modal.Header>
                  <Modal.Content>
                    <Modal.Description>
                      <Header>About This Beer</Header>
                      <p>{description}</p>
                      { ibu && <p>IBU: {ibu}</p>}
                      { abv && <p>ABV: {abv}</p>}
                    </Modal.Description>
                  </Modal.Content>
                  <Modal.Content>
                    <Modal.Description>
                      <Header>About {style.name}s</Header>
                      <p>{style.description}</p>
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


export default Beers;
