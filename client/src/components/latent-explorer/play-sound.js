import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import teal from '@material-ui/core/colors/teal'
import PlayArrow from '@material-ui/icons/PlayArrow'

const style = {
	wrapper: {

  },
  inactive: {
    height: 60,
    width: 300,
    border: '1px solid ' + teal['A400']
	},
	active: {
    height: 60,
    width: 300,
    color: 'white',
		background: teal['A700'],
		border: '1px solid ' + teal['A400']
  }
}

class PlaySound extends Component {

  constructor(props) {
    super(props)
    this.state = {
			isActive: false
		}
	}

	handlePlay() {
    if (this.state.isActive !== true) {
      this.props.playSound()
      this.setState({isActive: true})
      setTimeout( () => {
        this.setState({isActive: false})
      }, this.props.playTimeout)
    }
  }

  handleKeyDown(e) {
    // spacebar = 32
		if (e.keyCode === 32) {
			this.handlePlay()
		}
	}
  
  componentDidMount(){
		document.addEventListener("keydown", this.handleKeyDown.bind(this), false)

  }
  componentWillUnmount(){
		document.removeEventListener("keydown", this.handleKeyDown.bind(this), false)
  }

  render() {

		let content = 
			<Button 
				style={this.state.isActive ? style.active : style.inactive}
				color={"secondary"}
				size={"small"}
				onClick={this.handlePlay.bind(this)}
			>
				<PlayArrow/>
			</Button>

    return (
      <div style={style.wrapper}>
        {content}
      </div>
    )
  }
}

PlaySound.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(style)(PlaySound)
