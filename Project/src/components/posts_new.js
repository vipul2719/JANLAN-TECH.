import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  _onSubmit(formProps) {
    this.props.createPost(formProps)
      .then(() => {
        this.context.router.push('/');
      });
  }

  render(){
    const { fields: { title, categories, content }, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this._onSubmit.bind(this))}>
        <h3>Create A New Post
        </h3>
        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>Title</label>
          <input type="text" className="form-control" {...title}/>
          <div className="text-danger">
            {title.touched ? title.error : ''}
          </div>
        </div>

        <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
          <label>Categories</label>
          <input type="text" className="form-control" {...categories}/>
          <div className="text-danger">
            {categories.touched ? categories.error : ''}
          </div>
        </div>

        <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
          <label>Content</label>
          <textarea type="text" className="form-control" {...content}/>
          <div className="text-danger">
            {content.touched ? content.error : ''}
          </div>
        </div>

        <button className="btn btn-primary" type="submit">Submit</button>
        <Link to='/' className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values){
  const errors = {}

  if (!values.title){
    errors.title = "Title cannot be blank!"
  }
  if (!values.categories){
    errors.categories = "Categories cannot be blank!"
  }
  if (!values.content){
    errors.content = "Content cannot be blank!"
  }

  return errors;
}

export default reduxForm({
  form: 'PostsNew',
  fields: ['title', 'categories', 'content'],
  validate
}, null, { createPost })(PostsNew);