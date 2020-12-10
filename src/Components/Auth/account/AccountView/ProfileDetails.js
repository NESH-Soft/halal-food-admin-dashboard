import React, { useContext, useState } from 'react';
import AuthContext from '../../../../context/AuthContext/AuthContext'
import Notification from '../../../common/Notification'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
} from '@material-ui/core';


const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({user}) => {
  const classes = useStyles();

  const { updateUser, serverMessage } = useContext(AuthContext);
  const [formData, setFormData]=useState({
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
  
});


const {_id, name, email,phone,address, } = formData;


const onSubmit = e => {
  e.preventDefault();

  updateUser({ 
    _id,
    name,
    phone,
    email,
    address,
  });
  }
  
  const onChange=e=>{setFormData({...formData,[e.target.name]:e.target.value});} 
 

  return (
  
    <div>
        {serverMessage && <Notification severity='error' message={serverMessage}/> }
    <form className={classes.form} onSubmit={e=>onSubmit(e)}>
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                name="name"
                variant="outlined"
                required
                fullWidth
                label="Name"
                autoFocus
                value={name}
                onChange={e=> onChange(e)}
              />
            </Grid>
         

        
            <Grid item xs={12}>
              <TextField
                size="small"
                variant="outlined"
                required
                fullWidth
                label="Email Address"
                name="email"
                value={email}
                onChange={e=> onChange(e)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                size="small"
                type="number"
                variant="outlined"
                required
                fullWidth
                label="Phone"
                name="phone"
                value={phone}
                onChange={e=> onChange(e)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                size="small"
                variant="outlined"
                required
                fullWidth
                label="Address"
                name="address"
                value={address}
                onChange={e=> onChange(e)}
              />
            </Grid>
          
          </Grid>
         
      
          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
          >
            Save details
          </Button>
        </Box>
       
      </Card>
      </form>
      </div>
  );
};


export default ProfileDetails;
