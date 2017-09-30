import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Button, Header, List, Container, Loader } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroller';

const styles = {
  scroller: { height: '60vh', overflowY: 'scroll' },
}

class Scores extends Component {
  state = { scores: [], show: 'All', page: 1, totalPages: 0 };

  componentDidMount() {
    axios.get('/api/scores.json')
      .then( res => {
        const { headers, data: { scores, total_pages } } = res;
        this.setState({ scores, totalPages: total_pages });
        // Keeps us logged in with the new token
        this.props.dispatch({ type: "HEADERS", headers });
      })
  }

  toggleShow = () => {
    this.setState( state => {
      this.setState({ show: state.show === 'All' ? 'My' : 'All' })
    })
  }

  scoreItems = () => {
    return this.state.scores.map(s => {
      return(
        <List.Item key={s.id}>
          <List.Content>
            <List.Header>{s.value}</List.Header>
            <List.Description>{s.email}</List.Description>
          </List.Content>
        </List.Item>
      )
    });
  }

  loadMore = () => {
    const page = this.state.page + 1;
    axios.get(`/api/scores?page=${page}`)
      .then( ({data, headers} ) => {
        this.setState( state => {
          return { scores: [...state.scores, ...data.scores], page }
        })
        this.props.dispatch({ type: 'HEADERS', headers });
      });
  }

  render() {
    const { show, scores, page, totalPages } = this.state;

    return(
      <Container>
        <Header as='h2'>{`Showing: ${show} Scores`}</Header>
        <Button onClick={this.toggleShow}>
          { show === 'All' ? 'All Scores' : 'My Scores'}
        </Button>
        <List divided>
          <InfiniteScroll
            pageStart={page}
            loadMore={this.loadMore}
            hasMore={ page < totalPages }
            loader={<Loader />}
            useWindow={true}
          >
            { this.scoreItems() }
          </InfiniteScroll>
        </List>
      </Container>
    )
  }
}

export default connect()(Scores);
