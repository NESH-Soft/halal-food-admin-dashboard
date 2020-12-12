import React, { useState, useContext, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom'
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  Button,
  CssBaseline,
  TextField,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextareaAutosize,
  LinearProgress,
} from '@material-ui/core';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CategoryContext from '../../context/CategoryContext/CategoryContext'
import ProductContext from '../../context/ProductContext/ProductContext'

const useStyles = makeStyles((theme) => ({
tittle: {
    height: 60,
    padding:0,
    margin:0,
    display:'flex'
  },

backButton:{
    padding:5,
  },
linkStyle:{
    textDecoration: 'none',
    color: 'white'
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '15px'
  },
 
}));

const  AddProduct = (props) => {
  const { getCategory,allCategory, } = useContext(CategoryContext)
  const { uploadProduct, success } = useContext(ProductContext)
  const classes = useStyles();
useEffect(()=>{
  getCategory();
  // eslint-disable-next-line
},[])

  const [formData, setFormData]=useState({
    name:null,
    price: 0,
    specialPrice:0,
    stock:0,
    description:null,
    productType: null,
    image:null
});
const [uploadProgress, setUploadProgress] = useState(false)
const [selectedCategory,setSelectedCategory]=useState([])
const [category,setCategory]=useState('')
const [subCategory,setSubCategory]=useState('')

const onChange = e => {setFormData({...formData,[e.target.name]:e.target.value});} 
const upHandler=e=>{setFormData({...formData,[e.target.name]:e.target.files[0]})}

const { name, price, specialPrice, stock, description,productType, image } = formData;


const handleSelect = (event) => {
  setSelectedCategory(event.target.value.subCategory);
  setCategory(event.target.value.name)
};


useEffect(() => {
  if(success){
    setUploadProgress(false);
    setFormData({
      name:null,
      price: 0,
      specialPrice:0,
      category: null,
      subCategory:null,
      stock:0,
      description:null,
      productType: null,
      image:null
    })
    //eslint-disable-next-line
    props.history.push('/dashboard/product');
  }
  //eslint-disable-next-line
},[success])

const onSubmit = e => {
  e.preventDefault();
  setUploadProgress(true);
console.log({name, price, specialPrice, stock, description,category,subCategory,productType, image})

  uploadProduct({ 
    name, price, specialPrice, stock, description,category,subCategory,productType, image
  });
  
  }
  
return (
  <div>
     <Paper variant="outlined" square  className={classes.tittle}> 
                  <div className={classes.backButton}>
                  <Link to ='/dashboard/product' className={classes.linkStyle}>
                      <Button variant="contained" color="primary">
                    <ArrowBackIosIcon/>Back
                      </Button>
                </Link>
                </div> 
             
           </Paper >
    <Container component="main" maxWidth="md">
   
      <Paper elevation={5} >
      <CssBaseline />
      <div className={classes.paper}>
    
        <Typography component="h1" variant="h5">
          Add Product
        </Typography>
        <form className={classes.form} onSubmit={e=>onSubmit(e)} encType="multipart/form-data" >
          <Grid container spacing={2}>
  

           <Grid item xs={12}>
              <TextField
                size="small"
                variant="outlined"
                required
                fullWidth
                label="Product Name"
                name="name"
                value={name}
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
                label="Price"
                name="price"
                value={price}
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
                label="specialPrice"
                name="specialPrice"
                value={specialPrice}
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
                name="stock"
                label="stock"
                value={stock}
                onChange={e=> onChange(e)}
              />
            </Grid>
       
          

  
        <Grid item xs={12}>
        <FormControl variant="outlined" className={classes.formControl}
        style={{width:"100%"}}
        size="small">
        <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          label="Category"
          name="category"
          onChange={handleSelect}
          required
          
        >
          {
            allCategory.map((item,index)=>(
              <MenuItem value={item}>{item.name}</MenuItem>
            ))
          }
       
          
        </Select>
      </FormControl>
        </Grid>
        <Grid item xs={12}>
        <FormControl variant="outlined" className={classes.formControl}
        style={{width:"100%"}}
        size="small">
        <InputLabel id="demo-simple-select-outlined-label">Sub Category</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          label="Sub Category"
          name="subCategory"
          onChange={(e)=>setSubCategory(e.target.value)}
          >
         
         {
            selectedCategory && selectedCategory.map((item,index)=>(
              <MenuItem value={item.name}>{item.name}</MenuItem>
            ))
          }
          
        </Select>
      </FormControl>
        </Grid>


        <Grid item xs={12}>
        <FormControl variant="outlined" className={classes.formControl}
        style={{width:"100%"}}
        size="small">
        <InputLabel id="demo-simple-select-outlined-label">Product Type</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          label="Product Type"
          name="productType"
          onChange={e=> onChange(e)}
          required
          
        >
         
          <MenuItem value='regular'>Regular</MenuItem>
          <MenuItem value='special'>Special</MenuItem>
          <MenuItem value='special'>Latest</MenuItem>
          
        </Select>
      </FormControl>
        </Grid>

     

            <Grid item xs={12}>
            <TextareaAutosize rows={6}
             style={{width:"100%"}}
            placeholder="Type something about product"
            name="description"
            value={description}
            onChange={e=> onChange(e)}
            required
             />
            </Grid>

            <Grid item xs={12}>
              <TextField
                size="small"
                type="file"
                variant="outlined"
                required
                fullWidth
                label="Product Image"
                name="image"
                onChange={e=> upHandler(e)}
              />
            </Grid>
  
          </Grid>
          {uploadProgress && <LinearProgress color="secondary" />}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={uploadProgress}
            className={classes.submit}
          >
          upload Product
          </Button>
      
        </form>
      </div>
      <Box mt={5}>
      </Box>
      </Paper>
    </Container>
    </div>
  );
}

export default withRouter(AddProduct);
