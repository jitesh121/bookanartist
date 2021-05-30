
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {
  Dialog,
  makeStyles,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  TextField,
  Button
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    overflow: 'visible',
  },
  paperScrollPaper: {
    overflow: 'visible',
  },
  scrollPaper: {
    alignItems: 'center',
    '& > div > div:nth-child(2)': {
      overflow: 'hidden',
    },
  },
  templatesScroll: {
    '& > div > div:nth-child(2)': {
      overflow: 'auto',
    },
  },
  scrollShow: {
    '& > div > div:nth-child(2)': {
      overflow: 'hidden',
      '& > div:nth-child(1)': {
        maxHeight: 'calc(100vh - 280px)',
        overflow: 'auto',
        padding: '0 20px',
      },
    },
  },
  changeWidth: {
    '& > div': {
      maxWidth: 800,
    },
  },
  lessWidth: {
    '& > div': {
      maxWidth: 320,
      '& > div': {
        padding: 0,
        '& ul': {
          margin: 0,
          padding: 20,
          '& li': {
            margin: '15px 10px',
            '& button': {
              width: '100%',
            },
          },
        },
      },
    },
  },
  dialogTitle: {
    color: 'black',
    background: 'white',
    minWidth: 540,
    '@media (max-width: 767px)': {
      minWidth: 'inherit',
      padding: '16px 10px',
    },
    '& h2': {
      '& span': {
        display: 'flex',
        alignItems: 'center',
        '& span': {
          width: 50,
          height: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'white',
          borderRadius: '50%',
          float: 'left',
          marginRight: 12,
        },
      },
    },
  },
}));
const App = () => {
  const classes = useStyles();
  const [artistInfo, setArtistInfo] = useState({});
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [openDialog, setopenDialog] = useState(false);
  const [reply,setReply] = useState('');
  const [reviewId,setReviewId] = useState('');

  const getAverageReview = async(reviewData) => {
    let totalRating = 0;
    reviewData.map(review=>{
      totalRating = totalRating + review.rating;
    });
    console.log(totalRating);
    setAverageRating(reviewData.length ? totalRating/reviewData.length : 0);
  };

  const getData = async() => {
    const res = await axios.get('/api/artist-reviews')
    setArtistInfo(res.data.result.artist);
    setReviews(res.data.result.reviews);
    getAverageReview(res.data.result.reviews);
  }
  useEffect(() => {
    getData()
  }, [])

  const openReplyBox = async(id) => {
    setopenDialog(true);
    setReviewId(id);
  };

  const handleClose = async() => {
    setopenDialog(false);
  }
  const handleChange = async(e) => {
    setReply(e.target.value)
  }
  const sendReply = async() => {
    const data = {
      "reviewId" : reviewId,
      "replies" : {"content" : reply}
    }
    console.log(data);
    const res = await axios.post('/api/reply-reviews',data);
    if(res){
      setopenDialog(false);
      getData();
    }
  }
 
  return (
    <>
    <div>
        <p>Artist: {artistInfo?.name}</p>
        <p>Rating: {averageRating}</p>
    </div>
    <div>
        <h5>Reviews:</h5>
        {reviews.map(r => <div><h3>Customer Name : {r?.Customer.name}</h3> 
        <h4>Review : {r.content}</h4> <p>{r.rating}</p>
        {r.replies && <h4>Reply : {r.replies.content}</h4>}
        <button onClick={() => openReplyBox(r.id)}>Reply</button></div>)}
    </div>
    <Dialog
      open={openDialog}
      onClose={handleClose}
      classes={{
        root: classes.root,
        paperScrollPaper: classes.paperScrollPaper,
      }}
    >
      <MuiDialogTitle className={`${classes.dialogTitle}`}>
        <span>Reply</span>
      </MuiDialogTitle>
      <MuiDialogContent>
      <TextField
            fullWidth
            id="content"
            type="text"
            onChange={handleChange}
            label={<>Type a reply*</>}
                    />
          <Button
            fullWidth
            type="submit"
            onClick={sendReply}
          >
            Send
          </Button>
      </MuiDialogContent>
    </Dialog>
    </>
  )
}

export default App
