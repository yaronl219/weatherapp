import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useEffect } from 'react'

export function ErrorMsg({onOpenErrMsg}) {

    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        onDisplayErrMsg()

    }, [onOpenErrMsg])

    const onDisplayErrMsg = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (

        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="warning">
                Oops! something went wrong! please try again later
            </Alert>
        </Snackbar>

    )
}
