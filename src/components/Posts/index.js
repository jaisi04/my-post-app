import React from "react";
import axios from "axios";
import PostsComponent from "./Posts";

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      page: 1,
      rows: 10,
      filterKey: "",
      error: "",
      pages: [1]
    };
    this.updateField = this.updateField.bind(this);
    this.getPosts = this.getPosts.bind(this);
    this.updatePage = this.updatePage.bind(this);
  }

  componentDidMount() {
    this.getPosts();
  }

  updateField(e) {
    e.preventDefault();
    this.setState({ filterKey: e.target.value }, () => this.getPosts());
  }

  updatePage(e) {
    e.preventDefault();
    this.setState({ page: e.target.value }, () => this.getPosts());
  }

  getPosts() {
    const { page, rows, filterKey } = this.state;
    this.setState({ btnDisabled: true });
    axios
      .get(
        `http://localhost:8080/posts?pageNo=${page ||
          1}&pageSize=${rows}&title=${filterKey}`,
        {
          headers: { Authorization: `Bearer ${this.props.token}` }
        }
      )
      .then(res => {
        const pages = [...Array(res.data.totalNoPages||1).keys()].map(x => ++x);
        this.setState({
          posts: res.data.post || [],
          page: res.data.currentPage,
          pages,
          error: !res.data.post.length && 'No posts!'
        });
      })
      .catch(err => {
        this.setState({ error: "Something went wrong" });
      });
  }

  render() {
    return (
      <PostsComponent
        updatePage={this.updatePage}
        updateField={this.updateField}
        {...this.state}
        {...this.props}
      />
    );
  }
}

export default Posts;
