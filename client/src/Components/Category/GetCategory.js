import React, {useEffect,useContext,useState} from 'react'
import {Link} from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button,Paper,makeStyles,TextField, Grid} from '@material-ui/core';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
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
  deleteContent:{
      border: '1px solid',
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
    },
  deleteContentMiddle:{
      display:'flex',
    },
  deleteContentSpace:{
      paddingRight:6
    }
   
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
const [anchorEl, setAnchorEl] = React.useState(null);
const [deleteId, setDeleteId] = React.useState(null);



const handleClick = (_id,event) => {
  setAnchorEl(anchorEl ? null : event.currentTarget);
  setDeleteId(_id);
};

const openAncor = Boolean(anchorEl);
const id = openAncor ? 'transitions-popper' : undefined;


// handle open modal for add sub category 
const handleOpen = (id) => {
  setOpen(true);
  setCategoryId(id)

};

const handleClose = () => {
  setOpen(false);
};



const handleAddCategory = () => {
  addCategory({name:category})
  setCategory('')
};

const handleAddSubCategory = () => {
  addSubCategory({_id:categoryId, name:subCategory})
  setSubCategory('')
  setCategoryId('')
  setOpen(false);

};


// handle delete category
const handleDelete= () => {
  deleteCategory(deleteId)
  handleClick()
}

// handle delete subcategory category
const handleSubCategoryDelete = (catId,subCatId) => {
    deleteSubCategory(catId,subCatId)
  };

// modal body  
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
                      <Button 
                      variant="contained"
                      size="small" 
                      onClick={handleAddSubCategory} 
                      color="primary" >Add</Button>
                  </Grid>         
      </Grid>
   
    </div>
  );


    return (
    <div>
    <Paper variant="outlined" square  className={classes.tittle}> 
      <div className={classes.backButton}>
                <Link to ='/dashboard' className={classes.linkStyle}>
                <Button 
                variant="contained" 
                color="primary">
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
                <Button 
                variant="contained" 
                size="small" 
                onClick={handleAddCategory}
                color="primary">Add</Button>
            </Grid>
   </Grid>
  </div>

    <div>
    <Paper variant="outlined" elevation={5} className={classes.content}>
    <Popper id={id} open={openAncor} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <div className={classes.deleteContent}>
              are you want to delete?
              <div className={classes.deleteContentMiddle}>
            <div className={classes.deleteContentSpace}>  <Button  size="small" aria-describedby={id} onClick={handleClick} variant="contained" color="primary">
                    No
                      </Button>
                </div>
                <div>  <Button size="small" aria-describedby={id} variant="contained" onClick={() => handleDelete()} color="primary">
                    Yes
                      </Button>
                </div>
                </div>
            </div>
           
          </Fade>
        )}
      </Popper>

   
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
              onDelete={(event)=>handleClick(category._id,event)} 
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
   


