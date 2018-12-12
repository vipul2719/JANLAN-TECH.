import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router';

class PostsShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
  }

  _onDelete() {
    this.props.deletePost(this.props.params.id)
      .then(()=> {this.context.router.push('/')})
  }

  render(){
    if (!this.props.post){
      return ( <div>Loading...</div> );
    }

    return (
      <div>
        <Link to="/">Home</Link>
        <h3>{this.props.post.title}</h3>
        <h6>{this.props.post.categories}</h6>
        <p>{this.props.post.content}</p>
        <button className="btn btn-danger pull-xs-right" onClick={this._onDelete.bind(this)}>
          Delete
        </button>
      </div>
    );
  }
}

function mapStateToProps(state){
  return { post: state.posts.post };
}
export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);