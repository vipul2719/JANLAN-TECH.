import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index';
import { Link } from 'react-router';

export default class PostsIndex extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  _renderPosts(){
    return this.props.posts.map((post) => {
      return (
        <li className="list-group-item" key={post.id}>
          <Link to={`post/${post.id}`}>
            <strong>{post.title}</strong>
            <span className="pull-xs-right">{post.categories}</span>
          </Link>
        </li>
      )
    });
  }

  render(){
    return (
      <div>
        <h3>Blog Entries</h3>
        <ul className="list-group">
          {this._renderPosts()}
        </ul>
        <div className="text-xs-right new">
          <Link to="/posts/new" className="btn btn-primary">New Post</Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts.all };
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);