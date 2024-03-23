import { useEffect, useState } from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getOrgs } from "../apis";
import { useDebounce } from "../custom-hooks";

export const SearchBar = ({ setSelectedOption }: { setSelectedOption: (value: string) => void }) => {
    const [searchKey, setSearchKey] = useState('');
    const [value, setValue] = useState('');

    // Debounce the search key to improve performance
    const debouncedSearchKey = useDebounce<string>(searchKey, 300);

    // Fetch organizations data using query
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['search-orgs', debouncedSearchKey],
        queryFn: () => getOrgs(debouncedSearchKey),
        enabled: !!debouncedSearchKey.length,
        retry: false,
    });

    // Destructure data
    const { items } = data ?? [];

    // Prepare options for autocomplete
    const options = searchKey.length && items?.length ? items.map((item: any) => item.login) : [];

    // Reset selected option if error occurs
    useEffect(() => {
        if (isError) {
            setSelectedOption('');
            setValue('');
        }
    }, [isError, setSelectedOption]);

    useEffect(() => {
        setSelectedOption(value);
    }, [value, setSelectedOption]);

    return (
        <Autocomplete
            fullWidth
            freeSolo
            loading={isLoading}
            value={value}
            onChange={(_event: any, value: string | null) => {
                setValue(value ?? '');
            }}
            onInputChange={(_event, value) => {
                setSearchKey(value.trim());
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search Organizations"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                    required
                    error={isError}
                    helperText={isError ? error.message : null}
                />
            )}
            options={options}
        />
    );
}
