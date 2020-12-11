import React, {useEffect,useContext,useState} from 'react'
import {Link} from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button,Paper,makeStyles,TextField,Typography, Grid} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Modal from '@material-ui/core/Modal';
import CategoryContext from '../../context/CategoryContext/CategoryContext'

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    tittle: {
      height: 60,
      padding:0,
      margin:0,
      display:'flex'
    },
  backButton:{
      padding:5,
    },

    content:{
       margin:8,
      //  paddingTop:'13%',
      //  flexGrow: 1,
      //  textAlign: 'center',
    height: '77vh',
    overflow: 'auto',
    },
    table: {
      minWidth: 300,
      
    },
    addCategoryStyle:{
      textAlign:"center"
    },
    linkStyle:{
      textDecoration: 'none',
      color: 'white'
    },
    spinner: {
      textAlign: 'center',
      marginTop:'15%'
    
    },
    modalBox: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  
   
  }))
 const UpCoaming = () => {
  const classes = useStyles()
  const {getCategory,allCategory,addCategory,addSubCategory,deleteCategory,deleteSubCategory} = useContext(CategoryContext)
  useEffect(()=>{
    getCategory()
    // eslint-disable-next-line
  },[])
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
const [category,setCategory]= useState('')
const [subCategory,setSubCategory]= useState('')
const [categoryId,setCategoryId]= useState('')

const handleAddCategory = () => {
  addCategory({name:category})
  setCategory('')
};

const handleAddSubCategory = () => {
  addSubCategory({_id:categoryId, name:subCategory})
  console.log({_id:categoryId, name:subCategory})
  setSubCategory('')
  setCategoryId('')
  setOpen(false);

};


  const handleDelete = (id) => {
    deleteCategory(id)
  };
  const handleSubCategoryDelete = (catId,subCatId) => {
    deleteSubCategory(catId,subCatId)
  };
  

 

 

  const handleOpen = (id) => {
    setOpen(true);
    setCategoryId(id)
 
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.modalBox}>
      <h2 id="simple-modal-title">Create Sub Create</h2>
      <Grid className={classes.addCategoryStyle} >
                  <Grid>
                        <TextField
                        size="small"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Create new subcategory"
                        name="subCategory"
                        value={subCategory}
                        onChange={(e)=>setSubCategory(e.target.value)}
                      />
                  </Grid>
                      
                  <Grid>
                      <Button variant="contained"size="small" onClick={handleAddSubCategory} color="primary" >Add</Button>
                    </Grid>
                      
                </Grid>
   
    </div>
  );

 

    return (
   
   
        <div>
          <Paper variant="outlined" square  className={classes.tittle}> 
                  <div className={classes.backButton}>
                  <Link to ='/dashboard' className={classes.linkStyle}>
                      <Button variant="contained" color="primary">
                    <ArrowBackIosIcon/>Back
                      </Button>
                </Link>
                </div> 
           </Paper > 

           <div style={{marginLeft:"25%"}}>
           <Grid className={classes.addCategoryStyle} >

<Grid item xs={12} sm={6}>
<TextField
  size="small"
  variant="outlined"
  margin="normal"
  required
  fullWidth
  label="Create new category"
  name="category"
  value={category}
  onChange={(e)=>setCategory(e.target.value)}
  />
</Grid>
<Grid item xs={12} sm={6}>
<Button variant="contained" size="small" onClick={handleAddCategory} color="primary">Add</Button>
</Grid>
</Grid>
           </div>

      <div>
           <Paper variant="outlined" elevation={5} className={classes.content}>


   
           <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell  align="center">Category</TableCell>
            <TableCell  align="center">Action</TableCell>
            <TableCell  align="center">Sub Category</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
          allCategory && allCategory.map((category,index)=>(
            <TableRow key={index}>
              <TableCell align="center">
                <Grid>
              <Chip
              label={category.name}
              clickable
              color="primary"
              onDelete={()=>handleDelete(category._id)} 
             />
              
            </Grid>
     
           </TableCell>
   
              <TableCell align="center">
            
              <Button variant="contained" size="small" onClick={()=>handleOpen(category._id)} color="primary" >
              Add sub
            </Button>

           </TableCell>



              <TableCell align="center">
             {
              
               category.subCategory && category.subCategory.map((sub,index)=>(
              
                <Chip   
                label={sub.name}
                clickable
                color="primary"
                onDelete={()=>handleSubCategoryDelete(category._id,sub._id)}
                
              />
             
            

               ))}
                 
            
    
              </TableCell>
            </TableRow>
          ))
        }
          
        </TableBody>
      </Table>
    </TableContainer>
          </Paper> 
        
        </div>

        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
        </div>
    )
}
export default UpCoaming;
   


