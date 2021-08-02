import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var challengeSelect = false;
var winnerSelect = false;
var oneSelected = false;

var switchName1
var switchName2
var switchIndex1
var switchIndex2
var selected = false;
var del = false;
var players = [
    "OTTO SKEPAST",
    "RASMUS JOHANN",
    "FRANZ ROBERT RIISMAA",
    "ROBERT MIHKEL TALUR",
    "ARINA",
    "OLIVER BALITSKI",
    "ANNA",
    "ELIIS LOREE PADAR",
    "TIMO",
    "ATS SAUKAS",
    "GREN SAMM",
    "JOOSEP MATTIAS TALUR",
    "KARDO",
    "ANDREAS MERE",
    "HENRI",
    "ARMIN MERE",
    "AKSEL SOOMETS",
    "LUKA PUUMETS",
    "JAAN ERIK JAAKSON",
    "",
    ""
  ];


class Conrols extends React.Component {
    render() {
        return (
            <div>
                <button className="controls" onClick={function() { if(!challengeSelect && !winnerSelect){ challengeSelect = true} else if(challengeSelect) {challengeSelect = false; selected = false; del = false}}}>
                    Välja kutsutud
                </button>
                <button className="controls" onClick={function() { if(!challengeSelect && !winnerSelect){ winnerSelect = true} }}>
                    Liiguta
                </button>
            </div>
        )
    }
}

class Square extends React.Component {

    render() {
      return (
        <button 
        className={this.props.className} 
        onClick={() => this.props.onClick()}>
          {this.props.value}
        </button>
      );
    }
  }
  
  class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          squares: players,
          marked: Array(21).fill(false),
          className: Array(21).fill('square')
        };
    }

    handleClick(i) {
        var className = this.state.className.slice();
        var marked = this.state.marked.slice();
        var squares = this.state.squares.slice();
        if(challengeSelect && !selected && this.state.marked[i] === false){
            className[i] += ' square-selected';
            this.setState({className: className}); 
            selected = true; 
            marked[i] = true;
            this.setState({marked: marked});
            } 
        else if(challengeSelect && selected && this.state.marked[i] === false && del === false){
            className[i] += ' square-selected';
            this.setState({className: className}); 
            challengeSelect = false; 
            selected = false; 
            marked[i] = true;
            this.setState({marked: marked});
        }
        else if(challengeSelect && !selected && this.state.marked[i] === true){
            className[i] = 'square';
            this.setState({className: className});
            selected = true;
            marked[i] = false;
            this.setState({marked: marked});
            del = true;
        } 
        else if(challengeSelect && selected && this.state.marked[i] === true && del === true){
            className[i] = 'square';
            this.setState({className: className}); 
            challengeSelect = false; 
            selected = false; 
            marked[i] = false;
            this.setState({marked: marked});
            del = false;
        }
        else if(winnerSelect && !selected){
            className[i] += ' square-switch';
            this.setState({className: className});
            selected = true;
            switchName1 = this.state.squares[i];
            switchIndex1 = i;
        }
        else if(winnerSelect && selected && this.state.squares[i] != switchName1){
            switchName2 = this.state.squares[i]
            switchIndex2 = i;
            className[switchIndex1] = 'square';
            className[switchIndex2] = 'square';
            squares[switchIndex1] = switchName2;
            squares[switchIndex2] = switchName1;
            this.setState({className: className, squares: squares})
            selected = false;
            winnerSelect = false;
        }
        
    }

    renderSquare(i) {
        console.log(this.state.marked);
      return <Square 
      value={this.state.squares[i]}
      className={this.state.className[i]}
      marked={this.state.marked[i]}
      onClick={() => this.handleClick(i)}
      />;
      
    }
  
    render() {
      const status = 'Next player: X';
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
          </div>
          <div className="board-row">
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
            {this.renderSquare(9)}
          </div>
          <div className="board-row">
            {this.renderSquare(10)}
            {this.renderSquare(11)}
            {this.renderSquare(12)}
            {this.renderSquare(13)}
            {this.renderSquare(14)}
          </div>
          <div className="board-row">
            {this.renderSquare(15)}
            {this.renderSquare(16)}
            {this.renderSquare(17)}
            {this.renderSquare(18)}
            {this.renderSquare(19)}
            {this.renderSquare(20)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Conrols />
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  


  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  