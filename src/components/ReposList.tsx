import {
    Grid,
    Paper,
    Slider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ReposListItem } from "./RepostListItem";

export const ReposList = ({ items }: { items: any }) => {
    const [openIssuesRange, setOpenIssuesRange] = useState<number | number[]>([0, 0]);

    // Calculate the maximum number of open issues
    const maxNumberOpenIssues = items.length ? Math.max(...items.map((item: any) => item.open_issues_count)) : 0;

    // Function to handle range change
    const changeRange = (event: Event, value: number | number[]) => {
        setOpenIssuesRange(value);
    };

    useEffect(() => {
        setOpenIssuesRange([0, maxNumberOpenIssues]);
    }, [maxNumberOpenIssues]);

    return (
        <>
            <Grid item container xs={12} mb={2} justifyContent="center" alignItems="center">
                <Typography variant="caption" align="center">Filter by open issues:</Typography>
                <Slider
                    getAriaLabel={() => 'Number of Open Issues'}
                    value={openIssuesRange}
                    onChange={changeRange}
                    valueLabelDisplay="auto"
                    max={maxNumberOpenIssues > 0 ? maxNumberOpenIssues : 100} // Set max value for slider
                    disableSwap
                />
            </Grid>
            <Grid item container xs={12} mb={2} justifyContent="center" alignItems="center">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="Table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Open Issues</TableCell>
                                <TableCell>Stars</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items?.map((item: any) => {
                                const { id, open_issues_count } = item;

                                const isBlurred = Array.isArray(openIssuesRange) && (
                                    open_issues_count < openIssuesRange[0] ||
                                    open_issues_count > openIssuesRange[1]
                                );

                                return (
                                    <ReposListItem key={id} rowItem={item} isBlurred={isBlurred} />
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </>
    );
};
