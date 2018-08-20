import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { handleTitleChange, handleComposerChange, handleInstrumentationChange, handleMusicScoreUpload, fetchPostMusicScore } from '../actions.js';

class MusicUploadForm extends Component {

  handleSubmit = (event) => {
    event.preventDefault();

    let formData = new FormData();
    formData.append('title', `${this.props.title}`)
    formData.append('composer', `${this.props.composer}`)
    formData.append('instrumentation', `${this.props.instrumentation}`)
    formData.append('user_id', `${this.props.userId}`)
    formData.append('music_score', this.props.music_score);

    this.props.fetchPostMusicScore(formData)
  }

  render () {
    return (
      <form className="music-upload-form" onSubmit={this.handleSubmit}>
        <label htmlFor="title">Name of Piece: </label>
        <input
          type="text"
          name="title"
          placeholder="..e.g. Sonata, Concerto"
          value={this.props.title}
          onChange={this.props.handleTitleChange}
        /><br/>
      <label htmlFor="composer">Name of Composer: </label>
          <input
            type="text"
            name="composer"
            placeholder="..e.g. Mozart, Beethoven"
            value={this.props.composer}
            onChange={this.props.handleComposerChange}
          /><br/>
        <label htmlFor="title">Instrumentation: </label>
          <input
            type="text"
            name="title"
            placeholder="..e.g. Violin & Piano"
            value={this.props.instrumentation}
            onChange={this.props.handleInstrumentationChange}
          /><br/>
        <label htmlFor="file">Music Score: </label>
        <input type="file" name="music_score" onChange={this.props.handleFileUpload}/><br/>
        <input type="submit" value="upload"/>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return {
    userId: state.userId,
    username: state.username,
    title: state.title,
    composer: state.composer,
    instrumentation: state.instrumentation,
    music_score: state.music_score,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleTitleChange: (event) => dispatch(handleTitleChange(event.target.value)),
    handleComposerChange: (event) => dispatch(handleComposerChange(event.target.value)),
    handleInstrumentationChange: (event) => dispatch(handleInstrumentationChange(event.target.value)),
    handleFileUpload: (event) => dispatch(handleMusicScoreUpload(event.target.files[0])),
    fetchPostMusicScore: (score) => dispatch(fetchPostMusicScore(score))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MusicUploadForm));