import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Grid from './Grid'
import {Buttons} from './Buttons'

class Main extends Component {

    speed = 100
    rows = 30
    cols = 50

    state = {
        generation: 0,
        gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false)),
    }

    //? On click of box make it ON -> OFF and OFF -> ON
    selectBox = (row, col) => {
        let gridCopy = {...this.state.gridFull}
        gridCopy[row][col] = !gridCopy[row][col]
        this.setState(() => ({
            gridFull: gridCopy
        }))
    }

    //! ES6 VERSION
    /* selectBox = (row, col) => {
        const gridFull = this.state.gridFull.map((rowArr, rowIdx) =>
          rowArr.map(
            (item, colIdx) => (rowIdx === row && colIdx === col ? !item : item)
          )
        );
        this.setState(() => ({ gridFull }));
    }; */

    //! game of life logic lives here in this function
    play = () => {
        console.log('playyy');
        let g = this.state.gridFull
        let g2 = arrayClone(this.state.gridFull)

        for (let i = 0; i < this.rows; i++) { // 30
          for (let j = 0; j < this.cols; j++) { // 50

		    let count = 0;
		    if (i > 0) if (g[i - 1][j]) count++;
		    if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
		    if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
		    if (j < this.cols - 1) if (g[i][j + 1]) count++;
		    if (j > 0) if (g[i][j - 1]) count++;
		    if (i < this.rows - 1) if (g[i + 1][j]) count++;
		    if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
            if (i < this.rows - 1 && j < this.cols - 1) if (g[i + 1][j + 1]) count++;


		    if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
		    if (!g[i][j] && count === 3) g2[i][j] = true;
		  }
		}
		/* this.setState({
		  gridFull: g2,
		  generation: this.state.generation + 1
        }); */

        this.setState( (state) => ({
            gridFull: g2,
            generation: state.generation + 1
        }));
    }


    // Seed board with random boxes ON(Green) initially
    seed = () => {
        let gridCopy = {...this.state.gridFull}
        for(let i=0; i< this.rows; i++) { // 30
            for(let j=0;j < this.cols; j++) { // 50
                if (Math.floor(Math.random() * 4) === 1) {
                    gridCopy[i][j] = true
                }
            }
        }

        this.setState(() => ({
            gridFull: gridCopy
        }))
    }

    // ES6 version
    /* seed = () => {
        const gridFull = this.state.gridFull.map(rowArr =>
          rowArr.map(() => Math.floor(Math.random() * 4) === 1)
        );
        this.setState(() => ({ gridFull }));
    }; */

    playButton = () => {
        clearInterval(this.intervalId)
        this.intervalId = setInterval(this.play, this.speed)
    }

    pauseButton = () => {
        clearInterval(this.intervalId)
    }

    slow = () => {
        this.speed = 1000
        this.playButton()
    }

    fast = () => {
        this.speed = 100
        this.playButton()
    }

    clear = () => {
        console.log('clearrr');
        const grid =  Array(this.rows).fill().map(() => Array(this.cols).fill(false))
        this.setState(() => ({
           gridFull: grid,
           generation: 0
        }))
        clearInterval(this.intervalId)
    }

    gridSize = (size) => {
        switch (size) {
            case "1":
                this.cols = 20;
                this.rows = 10
                break;
            case "2":
                this.cols = 50;
                this.rows = 30
                break;
            default:
                this.cols = 70;
                this.rows = 50
        }

        this.clear()
    }



    componentDidMount() {
        this.seed()
        this.playButton()
    }

    render() {
        return (
            <div>
                <h1>Game of Life</h1>
                <Buttons
                    playButton={this.playButton}
                    pauseButton={this.pauseButton}
                    slow={this.slow}
                    fast={this.fast}
                    clear={this.clear}
                    seed={this.seed}
                    gridSize={this.gridSize}
                />
                <Grid
                    gridFull={this.state.gridFull}
                    rows={this.rows}
                    cols={this.cols}
                    selectBox={this.selectBox}
                />
                <h2>Generation: {this.state.generation}</h2>
            </div>
        );
    }
}

function arrayClone(arr) {
    return JSON.parse(JSON.stringify(arr));
}


ReactDOM.render(<Main />, document.getElementById('root'));
