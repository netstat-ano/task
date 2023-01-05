import { TableRow, TableCell, Modal, Box, Typography } from "@mui/material";
import { useState } from "react";
import Product from "../../Models/Product";
import styles from "./ProductRow.module.scss";
const ProductRow: React.FC<{ item: Product }> = (props) => {
    const { item } = props;
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const style = {
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        {item.id}, {item.name}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {item.year}, {item.pantone_value}, {item.color}
                    </Typography>
                </Box>
            </Modal>
            <TableRow
                className={styles["row"]}
                onClick={handleOpen}
                key={item.id}
                style={{ backgroundColor: item.color }}
            >
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.year}</TableCell>
            </TableRow>
        </>
    );
};

export default ProductRow;
