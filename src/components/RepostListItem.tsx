import { TableCell, TableRow } from "@mui/material";

export const ReposListItem = ({ isBlurred, rowItem }: { isBlurred: boolean, rowItem: any }) => {
    const { id, name, open_issues_count, stargazers_count } = rowItem;

    return (
        <TableRow className={`row ${isBlurred ? 'is-filtered' : ''}`}>
            <TableCell component="th" scope="row">{id}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{open_issues_count}</TableCell>
            <TableCell>{stargazers_count}</TableCell>
        </TableRow >
    );
}