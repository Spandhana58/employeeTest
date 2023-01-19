import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({ emp, onclosePopup, openDialog, deleteRecord }: any) {


    const handleClose = () => {
        onclosePopup();
    };

    return (
        <div>

            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`Delete Employee ${emp.firstName} ${emp.lastName}`}
                </DialogTitle>

                <DialogActions>
                    <Button onClick={() => {
                        deleteRecord(emp.id)
                    }}>Delete</Button>
                    <Button onClick={handleClose} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}