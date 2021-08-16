import React, {useState} from 'react';
import {styled, withStyles} from '@material-ui/core/styles';
import { useDataLayerValue } from './context/DataLayer';
import { Typography, Dialog, TextField, Button,
  DialogContent, DialogTitle, DialogActions } from '@material-ui/core';
import { changeLocaleISODate } from './utils';
import { getTaxiAvailability } from './services';

const InfoContainer = styled('div')({
  position: 'absolute',
  zIndex: 1,
  width: 330,
  background: '#ffffff',
  padding: '10px 24px',
  overflow: 'hidden',
  right: 0,
  margin: 24,
  boxShadow: '3px 2px 5px 2px #c3c3c3'
})

const LinkButton = styled('div')({
  textAlign: 'right',
  color: '#596dda',
  textDecoration: 'underline',
  cursor: 'pointer',
})

export default function InfoTaxi() {
  const [openDialog, setOpenDialog] = useState(false)
  const [timeField, setTimeField] = useState('')
  const [loading, setLoading] = useState(false)
  const [{taxiCount, timestamp}, dispatch] = useDataLayerValue()

  const changeFilterTaxi = async(dateTime) => {
    setLoading(true)
    let responseData = await getTaxiAvailability(dateTime);
    dispatch({type: 'SET_DATA_TAXI', payload: responseData.features[0].geometry.coordinates })
    dispatch({type: 'SET_TAXI_COUNT', payload: responseData.features[0].properties.taxi_count })
    dispatch({type: 'SET_TIMESTAMP', payload: responseData.features[0].properties.timestamp })
    setOpenDialog(!openDialog);
    setLoading(false)
  } 

  const handleOpeningDialog = () => {
    console.log(timestamp.split('+')[0])
    setTimeField(timestamp.split('+')[0])
    setOpenDialog(!openDialog);
  };

  return (
    <>
      <InfoContainer>
        <Typography variant="h6">
          Location of Taxis in Singapore
        </Typography>
        <div style={{height: 15}} />

        <Typography variant="body1">
          The position of taxis on <br />{changeLocaleISODate(timestamp)}
        </Typography>
        <div style={{height: 25}} />
        <Typography variant="body2">
          No. of Taxis
        </Typography>
        <div style={{height: 5}} />
        <Typography variant="h3">
          {taxiCount}
        </Typography>
        <LinkButton onClick={() => handleOpeningDialog()}>
          <Typography variant="caption">
            Change Filter date
          </Typography>
        </LinkButton>
      </InfoContainer>

      <Dialog
        open={openDialog}
        // onClose={handleOpeningDialog}
      >
        <DialogTitle>Choose date &amp; time  <br />for Available Taxi</DialogTitle>
        <DialogContent>
          <TextField
            id="datetime-local"
            label="Filter Date and Time"
            type="datetime-local"
            value={timeField}
            onChange={(e) => {
              setTimeField(e.target.value)
            }}
            // className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button 
            disabled={loading}
            onClick={handleOpeningDialog} color="default"
          >
            Cancel
          </Button>
          <Button 
            disabled={loading}
            onClick={() => {
              changeFilterTaxi(timeField)
            }} color="primary"
          >
            {loading ? 'Filtering...' : 'Filter'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
