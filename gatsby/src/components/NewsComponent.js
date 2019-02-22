import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  Card,
  CardHeader,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  Button
} from '@material-ui/core'
import { teal } from '@material-ui/core/colors'
import CircularProgress from '@material-ui/core/CircularProgress'

const StyledCard = withStyles({
  root: {
    background: teal[700],
    height: 350,
    '&:hover': {
      backgroundColor: `${teal[900]}`
    },
    cursor: 'pointer'
  }
})(Card)

const StyledCardHeader = withStyles({
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14
  }
})(CardHeader)

const StyledDialog = withStyles({
  root: {
    padding: 0,
    width: '100vw'
  },
  paper: {
    height: '80vh',
    background: 'black'
  }
})(Dialog)

class NewsComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  onClose = () => this.props.closeModal()

  onPrev = () => this.props.callPrev()

  onNext = () => this.props.callNext()

  render () {
    const { pubDate, title, link, media } = this.props.news
    const { loading } = this.state
    const { open } = this.props

    return (
      <div>
        <StyledCard onClick={() => this.props.openModal(this.props.idx)}>
          <StyledCardHeader title={new Date(pubDate).toLocaleString('en-US', { timeZone: 'America/Toronto' })} />
          <CardActionArea>
            <CardMedia
              component='img'
              alt={title}
              src={media.thumbnail.attrs.url}
              title={title}
            />
          </CardActionArea>
          <CardContent>
            <Typography style={{ color: 'white', fontSize: 18, textAlign: 'center' }} variant='body2'>
              {title}
            </Typography>
          </CardContent>
        </StyledCard>
        <StyledDialog open={open} scroll='paper' onClose={this.onClose} fullWidth maxWidth={false}>
          <DialogContent style={{ textAlign: 'center', overflowY: 'hidden' }}>
            {loading && <CircularProgress color='secondary' />}
            <iframe
              src={link}
              width='100%'
              height='100%'
              onLoad={() => this.setState({ loading: false })}
              frameBorder='0'
              marginHeight='0'
              marginWidth='0'
            />
          </DialogContent>
          <DialogActions style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
            <Button onClick={this.onPrev} variant='contained' color='primary'>
              Prev
            </Button>
            <Button onClick={this.onClose} variant='contained' color='secondary'>
              Close
            </Button>
            <Button onClick={this.onNext} variant='contained' color='primary'>
              Next
            </Button>
          </DialogActions>
        </StyledDialog>
      </div>
    )
  }
}

NewsComponent.defaultProps = {
  open: false
}

NewsComponent.propTypes = {
  news: PropTypes.object.isRequired,
  callNext: PropTypes.func.isRequired,
  callPrev: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired
}

export default NewsComponent
