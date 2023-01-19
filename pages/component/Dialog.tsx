import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Autocomplete, Grid } from '@mui/material';
export interface IcreateEmployee {

    saveRecord: (employeeobj: any) => void,
    designations: any
}


export default function FormDialog({ saveRecord, designations }: IcreateEmployee) {
    const [open, setOpen] = React.useState(false);
    const [employeeObj, setEmployeeObj] = React.useState({
        firstName: "",
        lastName: "",
        emailAddress: "",
        age: "",
        designation: null

    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (e: any) => {
        setEmployeeObj({ ...employeeObj, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Create Employee
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create Employee</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item md={12} xl={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="firstName"
                                label="First Name"
                                name="firstName"
                                type="text"
                                fullWidth
                                variant="outlined"
                                onChange={handleChange}
                                value={employeeObj.firstName}
                            />
                        </Grid>
                        <Grid item md={12} xl={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                type="text"
                                fullWidth
                                variant="outlined"
                                onChange={handleChange}
                                value={employeeObj.lastName}
                            />
                        </Grid>
                        <Grid item md={12} xl={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="emailAddress"
                                label="Email Address"
                                name="emailAddress"
                                type="email"
                                fullWidth
                                variant="outlined"
                                onChange={handleChange}
                                value={employeeObj.emailAddress}
                            />
                        </Grid>
                        <Grid item md={12} xl={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="age"
                                name="age"
                                label="Age"
                                type="number"
                                fullWidth
                                variant="outlined"
                                onChange={handleChange}
                                value={employeeObj.age}
                            />
                        </Grid>
                        <Grid item md={12} xl={12}>
                            <Autocomplete
                                id="designation"
                                sx={{ width: 300 }}
                                options={designations}
                                value={employeeObj.designation}
                                autoHighlight
                                onChange={(event: any, newValue: any) => {
                                
                                    setEmployeeObj({ ...employeeObj, designation: newValue });
                                }}
                                getOptionLabel={(option) => option.name}
                                //renderOption={(props, option) => option.name}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Choose a Desingation"
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                        }}
                                    />
                                )}
                            />

                        </Grid>

                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        saveRecord(employeeObj)
                        handleClose();
                    }}>Save</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}