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
  TextareaAutosize
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

const  EditProduct = (props) => {
  const { getCategory,allCategory, } = useContext(CategoryContext)
  const { updateProduct,editForm, clearEditForm, success } = useContext(ProductContext)
  useEffect(()=>{
    getCategory()
  },[])
  const classes = useStyles();

  const [formData, setFormData]=useState({
    _id: editForm._id,
    name:editForm.name,
    price: editForm.price,
    specialPrice:editForm.specialPrice,
    stock:editForm.stock,
    description:editForm.description,
    productType: editForm.productType,
    image:editForm.image
});
const [selectedCategory,setSelectedCategory]=useState([])
const [category,setCategory]=useState(editForm.category)
const [subCategory,setSubCategory]=useState(editForm.subCategory)
const onChange=e=>{setFormData({...formData,[e.target.name]:e.target.value});} 
// const upHandler=e=>{setFormData({...formData,[e.target.name]:e.target.files[0]})}
const { name, price, specialPrice, stock, description,productType } = formData;

const handleSelect = (event) => {
  setSelectedCategory(event.target.value.subCategory);
  setCategory(event.target.value.name)
};
useEffect(() => {
  if(success){
    clearEditForm();
    setFormData({
      name:null,
      price: 0,
      specialPrice:0,
      stock:0,
      description:null,
      productType: null,

  })
    props.history.push('/dashboard/product');

  }
  // eslint-disable-next-line
},[success])

const onSubmit = e => {
  e.preventDefault();
console.log({ 
    name, price, specialPrice, stock, description,category,subCategory,productType})
  // updateProduct({ 
  //   _id,
  //   name, price, specialPrice, stock, description,category,subCategory,productType
  // });
  
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
          Update Product
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
          value={category}
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
          value={subCategory}
          onChange={(e)=>setSubCategory(e.target.value)}
          required
          
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
          value={productType}
          onChange={e=> onChange(e)}
          required
          
        >
         
          <MenuItem value='regular'>Regular</MenuItem>
          <MenuItem value='special'>Special</MenuItem>
          
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

            {/* <Grid item xs={12}>
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
            </Grid> */}
  
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
          UpdateProduct
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

export default withRouter(EditProduct);
