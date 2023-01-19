import * as React from 'react';
import { DataGrid, GridCellEditStopParams, GridCellEditStopReasons, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FormDialog from './Dialog';
import AlertDialog from './DeleteDialog';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
const designations = [{
    id: 1, name: "Developer"
}, {
    id: 2, name: "UI/UX"
}, {

    id: 3, name: "Manager"

},
{

    id: 4, name: "Senior Vice Preident"

},
{

    id: 5, name: "Senior Manager"

}]


const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, emailAddress: "jon@g.com", designation: 1 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, emailAddress: "crsei@g.com", designation: 2 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, emailAddress: "jaime@g.com", designation: 3 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, emailAddress: "arya@g.com", designation: 4 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 46, emailAddress: "daenerys@g.com", designation: 5 },
    { id: 6, lastName: 'Melisandre', firstName: 'Test', age: 50, emailAddress: "test@g.com", designation: 4 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, emailAddress: "ferrara@g.com", designation: 2 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, emailAddress: "rossini@g.com", designation: 1 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, emailAddress: "harvey@g.com", designation: 4 },
    { id: 10, lastName: 'Roxie', firstName: 'Harvey', age: 65, emailAddress: "harvey@g.com", designation: 2 },
];
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function EmployeeTable() {
    const [data, setData] = React.useState(rows);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const [selectedEmployee, setSelectedEmployee] = React.useState(null);
    const [operation, setOperation] = React.useState("");
    React.useEffect(() => {
        if (operation) {
            setOpenSnackBar(true)
        }

    }, [operation])

    const deleteRecord = (id: number) => {
        setData(data.filter(d => d.id !== id));
        setOperation("Deleted")
        setOpenDialog(false);
        setOpenSnackBar(true);

    }
    const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackBar(false);
    };
    const columns: GridColDef[] = [
        {
            field: 'actions', headerName: 'Actions', width: 100, renderCell: (params) => {

                return (
                    <IconButton onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEmployee(params.row);
                        setOpenDialog(true);

                    }}>
                        <DeleteIcon />
                    </IconButton>

                );
            }
        },
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 180, editable: true },
        { field: 'lastName', headerName: 'Last name', width: 180, editable: true },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 90,
            editable: true
        },
        {
            field: 'emailAddress',
            headerName: 'Email Address',
            type: 'email',
            width: 290,
            editable: true
        },
        {
            field: 'fullName',
            headerName: 'Full name',

            width: 260,
            valueGetter: (params: GridValueGetterParams) =>
                `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
        {
            field: 'designation',
            headerName: 'Designation',
            width: 260,
            valueGetter: (params: GridValueGetterParams) =>
                `${designations.find(f => f.id === params.row.designation)?.name}`,
        },
    ];
    const saveRecord = (employeeobj: any) => {
        setData([{ ...employeeobj, designation: employeeobj.designation.id, id: data.length + 1 }, ...data]);
        setOperation("Saved")
    }
    return (
        <div style={{ height: 580, width: '100%' }}>
            <FormDialog designations={designations} saveRecord={saveRecord} />
            {
                openDialog === true && <AlertDialog emp={selectedEmployee} onclosePopup={() => {
                    setOpenDialog(false)
                }} openDialog={openDialog} deleteRecord={deleteRecord} />
            }
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={openSnackBar} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={operation === "Deleted" ? "error" : "success"} sx={{ width: '100%' }}>
                    {`Record Successfully ${operation}`}
                </Alert>
            </Snackbar>
            <DataGrid
                rows={data}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                experimentalFeatures={{ newEditingApi: true }}
                onCellEditStop={(params: GridCellEditStopParams, event: any) => {

                    if (event.target) {

                        let dataTemp1 = [...data];
                        const dataTempIndx = data.findIndex(d => d.id === params.id);
                        let dataTemp: any = data[dataTempIndx]
                        dataTemp[params.field] = event.target.value;
                        dataTemp1[dataTempIndx] = dataTemp;
                        setData(dataTemp1);

                    }
                    if (params.reason === GridCellEditStopReasons.cellFocusOut) {
                        event.defaultMuiPrevented = true;
                    }
                }}

            />
        </div>
    );
}
