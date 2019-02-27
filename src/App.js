import React, { Component } from 'react';

class App extends Component {

  state = {
    centisecondsElapsed: 0,
    timeElapsed: {},
    clicks: 0,
    splits: [],
    selectedSplit: null
  };

  componentDidUpdate(prevProps, prevState){
    if (prevState.centisecondsElapsed !== this.state.centisecondsElapsed){
      let timeElapsed = this.parseTimeElapsed(this.state.centisecondsElapsed);
      this.setState({
        timeElapsed
      });
    };
  };

  countSeconds = () => {
      this.setState({
        centisecondsElapsed: this.state.centisecondsElapsed + 1
      });
  };

  parseDigits = (digit) => {
    return digit < 10 ? '0' + digit : digit;
  };

  parseTimeElapsed = (centisecondsElapsed) => {
    let centiseconds = centisecondsElapsed % 100;
    let seconds = Math.floor(centisecondsElapsed / 100) % 60;
    let minutes = Math.floor(centisecondsElapsed / 6000) % 60;
    centiseconds = this.parseDigits(centiseconds);
    seconds = this.parseDigits(seconds);
    minutes = this.parseDigits(minutes);
    let timeElapsed = {
      minutes,
      seconds,
      centiseconds
    };
    return timeElapsed;
  };

  firstClick = () => {
    if (this.state.clicks === 0){
      setInterval(this.countSeconds, 10);
    };
    this.setState({
      clicks: this.state.clicks + 1
    });
  };

  afterFirstClick = () => {
    let centisecondsElapsed = this.state.centisecondsElapsed;
    this.setState({
      splits: [...this.state.splits, centisecondsElapsed]
    });
  };

  resetTimeElapsed = (centisecondsElapsed) => {
    let splitsOnDOM = document.getElementsByClassName('splits');
    for (let i = 0; i < splitsOnDOM.length; i++){
      if (parseInt(splitsOnDOM[i].id, 10) === centisecondsElapsed){
        splitsOnDOM[i].style.color = '#42f477';
      } else {
        splitsOnDOM[i].style.color = 'black';
      };
    };

    let splits = this.state.splits.filter(split => split <= centisecondsElapsed)
    this.setState({
      centisecondsElapsed,
      splits
    });
  };

  render() {
    const splits = this.state.splits.length > 0 ? this.state.splits.map((split)=> {
      let indexOfPreviousSplit = this.state.splits.indexOf(split) - 1;
      let previousSplit = this.state.splits.indexOf(split) === 0 ? 0 : this.state.splits[indexOfPreviousSplit];
      let splitDifference = Math.abs(split - previousSplit);
      let parsedSplit = this.parseTimeElapsed(split);
      let parsedSplitDifference = this.parseTimeElapsed(splitDifference);
      return (
        <div className='splits noSelect' key={split} id={split} onClick={() => this.resetTimeElapsed(split)}>
          <div className='parsed-split'>
            <div>
              {parsedSplit.minutes > 0 ? parsedSplit.minutes : ''}
            </div>
            <div className='column-separator'>
              {parsedSplit.minutes > 0 ? ':' : ''}
            </div>
            <div>
              {parsedSplit.seconds > 0 || parsedSplit.minutes > 0 ? parsedSplit.seconds : ''}
            </div>
            <div className='column-separator'>
              {parsedSplit.seconds > 0 || parsedSplit.minutes > 0 ? '.' : ''}
            </div>
            <div>
              {parsedSplit.centiseconds > 0 || parsedSplit.seconds > 0 ? parsedSplit.centiseconds : ''}
            </div>
          </div>
          <div className='parsed-difference'>
            <div>
              {parsedSplitDifference.minutes > 0 ? parsedSplitDifference.minutes : ''}
            </div>
            <div className='column-separator'>
              {parsedSplitDifference.minutes > 0 ? ':' : ''}
            </div>
            <div>
              {parsedSplitDifference.seconds > 0 || parsedSplitDifference.minutes > 0 ? parsedSplitDifference.seconds : ''}
            </div>
            <div className='column-separator'>
              {parsedSplitDifference.seconds > 0 || parsedSplitDifference.minutes > 0 ? '.' : ''}
            </div>
            <div>
              {parsedSplitDifference.centiseconds > 0 || parsedSplitDifference.seconds > 0 ? parsedSplitDifference.centiseconds : ''}
            </div>
           </div>
        </div>
      );
    }) : null;

    return (
      <div className='body'>
          <div className='title'>
            FARA&apos;s Timer
          </div>
          <div className='timer noSelect' onClick={this.state.clicks === 0 ? this.firstClick : this.afterFirstClick}>
            <div>
              {this.state.timeElapsed.minutes ? this.state.timeElapsed.minutes : '00'}
            </div>
            <div className='column-separator'>
              :
            </div>
            <div>
              {this.state.timeElapsed.seconds ? this.state.timeElapsed.seconds : '00'}
            </div>
            <div className='column-separator'>
              .
            </div>
            <div>
              {this.state.timeElapsed.centiseconds ? this.state.timeElapsed.centiseconds : '00'}
            </div>
          </div>
          {splits}
      </div>
    );
  };
};

export default App;
