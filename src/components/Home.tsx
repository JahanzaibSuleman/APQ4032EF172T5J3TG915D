import { useEffect, useState } from "react";
import { Alert, Button, Container, Grid, Input, LinearProgress, Pagination, Typography } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import GitHubIcon from '@mui/icons-material/GitHub';
import UpdateIcon from '@mui/icons-material/Update';
import { getRepos } from "../apis";
import { SearchBar } from "./SearchBar";
import { useDebounce } from "../custom-hooks";
import { ReposList } from "./ReposList";

// Component for the Home page
export const Home = () => {
    const queryClient = useQueryClient();

    const [selectedOrg, setSelectedOrg] = useState(''); // State for selected organization
    const [repoKey, setRepoKey] = useState(''); // State for repository search key
    const [page, setPage] = useState(1); // State for pagination

    // Debounce the search key to improve performance
    const debouncedRepoKey = useDebounce<string>(repoKey, 300);

    // Check if selected organization is valid
    const isValidOrganization = !!selectedOrg.length;

    // Fetch data using query
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['search-repos', debouncedRepoKey, selectedOrg, page],
        queryFn: () => getRepos(debouncedRepoKey, selectedOrg, page),
        enabled: isValidOrganization,
        retry: false,
    });

    // Destructure data
    const { total_count, items } = data ?? {};

    // Calculate total number of pages
    const count = total_count ? Math.ceil(+(total_count) / 10) : 0;

    // Reset page when search key or organization changes
    useEffect(() => {
        setPage(1);
    }, [repoKey, selectedOrg]);

    const onRefetch = () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['search-repos'] });
    }

    return (
        <>
            {isLoading && <LinearProgress color="primary" />}
            <Container maxWidth="md">
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item xs={12}>
                        <Grid item container xs={12} mb={3} justifyContent="center" alignItems="center">
                            <GitHubIcon fontSize="large" color="primary" />
                        </Grid>
                        <Grid item container xs={12} mb={3} justifyContent="center" alignItems="center">
                            <SearchBar setSelectedOption={setSelectedOrg} />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} className={`${!isValidOrganization && 'hidden'}`}>
                        <Grid item xs={12}>
                            <Grid item container xs={12} mb={2} justifyContent="center" alignItems="center">
                                <Input
                                    fullWidth
                                    placeholder="Search Repository"
                                    value={repoKey}
                                    onChange={(event) => setRepoKey(event.target.value.trim())}
                                />
                            </Grid>
                            <Grid item container xs={12} mb={2} justifyContent="right" alignItems="center">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={onRefetch}
                                    endIcon={<UpdateIcon />}
                                >
                                    Refresh
                                </Button>
                            </Grid>
                            <Grid item container xs={12} mb={2} justifyContent="center" alignItems="center">
                                {isError && <Alert severity="error">{error.message}</Alert>}
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            {!isLoading && (
                                <>
                                    {items?.length ? (
                                        <>
                                            <ReposList items={items} />
                                            <Grid item xs={12} container justifyContent="center">
                                                <Pagination
                                                    count={count}
                                                    page={page}
                                                    color="primary"
                                                    onChange={(_event, value) => setPage(value)}
                                                />
                                            </Grid>
                                        </>
                                    ) : (
                                        <Typography variant="h6" align="center">
                                            No repositories found!
                                        </Typography>
                                    )}
                                </>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
