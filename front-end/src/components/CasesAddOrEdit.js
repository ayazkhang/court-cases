import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { addCase, updateCase, deleteCase, getCase } from "../store/actions/casesActions";

const CasesAddOrEdit = () => {
  const dispatch = useDispatch();
  const cases = useSelector((state) => state.cases.cases);


  useEffect(() => {
    dispatch(getCase());
  }, []);


  const [openDialog, setOpenDialog] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    id: "",
    customerName: "",
    startDate: "",
    isFinished: false,
  });
  const [validationErrors, setValidationErrors] = useState({
    customerName: "",
    startDate: "",
    isFinished: "",
  });

  const steps = ["Customer Name", "Start Date", "Is Finished"];

  const handleNextStep = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBackStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleOpenDialog = (index) => {
    setEditIndex(index);
    if (index !== null) {
      setFormData(cases[index]);
    } else {
      setFormData({
        customerName: "",
        startDate: "",
        isFinished: false,
      });
    }
    setActiveStep(0);
    setValidationErrors({
      customerName: "",
      startDate: "",
      isFinished: "",
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setEditIndex(null);
    setOpenDialog(false);
  };

  const handleAddOrUpdate = () => {
    const handleDispatch = (action) => {
      return new Promise((resolve, reject) => {
        dispatch(action);
        resolve();
      });
    };

    if (editIndex !== null) {

      handleDispatch(updateCase(formData.id, formData))
        .then(() => dispatch(getCase()))
        .catch((error) => {
          console.error('Error deleting case:', error);
        });
    } else {
      handleDispatch(addCase(formData))
        .then(() => {
          return handleDispatch(getCase());
        })
        .catch((error) => {
          console.log(error);
        });
    }

    handleCloseDialog();
  };

  const handleDelete = (index) => {
    dispatch(deleteCase(index))
      .then(() => dispatch(getCase()))
      .catch((error) => {
        console.error('Error deleting case:', error);
      });
  };

  const validateStep = (step) => {
    let isValid = true;
    const errors = { ...validationErrors };

    switch (step) {
      case 0:
        if (!formData.customerName.trim()) {
          errors.customerName = "Customer Name is required";
          isValid = false;
        } else {
          errors.customerName = "";
        }
        break;
      case 1:
        if (!formData.startDate.trim()) {
          errors.startDate = "Start Date is required";
          isValid = false;
        } else {
          errors.startDate = "";
        }
        break;
      default:
        break;
    }

    setValidationErrors(errors);
    return isValid;
  };

  return (
    <div>
      <Grid container spacing={2} justifyContent="flex-end" mt={5} pr={2}>
        <Button variant="contained" onClick={() => handleOpenDialog(null)}>
          Add New Case
        </Button>
      </Grid>
      <h2>All Cases</h2>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>Is Finished</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cases.map((caseItem, index) => (
              <TableRow key={caseItem.id}>
                <TableCell>{caseItem.customerName}</TableCell>
                <TableCell>{caseItem.startDate}</TableCell>
                <TableCell>{caseItem.isFinished ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog(index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(caseItem.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editIndex !== null ? "Edit Case" : "Add New Case"}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <form style={{ marginTop: "20px" }}>
            <Grid container justifyContent="flex-start" alignItems="center">
              <Grid item xs={8} ml={10}>
                {activeStep === 0 && (
                  <TextField
                    label="Customer Name"
                    value={formData.customerName}
                    onChange={(e) =>
                      setFormData({ ...formData, customerName: e.target.value })
                    }
                    fullWidth
                    margin="normal"
                    error={!!validationErrors.customerName}
                    helperText={validationErrors.customerName}
                  />
                )}
                {activeStep === 1 && (
                  <TextField
                    type="date"
                    value={formData.startDate ? formData.startDate.split('T')[0] : ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        startDate: e.target.value,
                      })
                    }
                    fullWidth
                    margin="normal"
                    error={!!validationErrors.startDate}
                    helperText={validationErrors.startDate}
                  />
                )}
                {activeStep === 2 && (
                  <div>
                    <label>Is Finished:</label>
                    <input
                      type="checkbox"
                      checked={formData.isFinished}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          isFinished: e.target.checked,
                        })
                      }
                      required // Mark isFinished as required
                    />
                  </div>
                )}
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button disabled={activeStep === 0} onClick={handleBackStep}>
            Back
          </Button>
          <Button
            onClick={
              activeStep === steps.length - 1
                ? handleAddOrUpdate
                : handleNextStep
            }
            variant="contained"
          >
            {activeStep === steps.length - 1 ? "Add/Update" : "Next"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CasesAddOrEdit;
