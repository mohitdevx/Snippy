import React from 'react'
import { SnippetsGrid } from '../components/SnippetGrid'
import { useState, useEffect } from 'react';
import { Api } from '../api/axios.api';
import { useLocation } from 'react-router-dom';

export const CodeSnippets = ({ type = 'snippet' }) => {

    const [snippets, setSnippets] = useState([]);
    const [loading, setLoading] = useState(true);

    const location = useLocation();

    const folder = location.state?.folder.name || null;

    useEffect(() => {
        fetchSnippets();
    }, []);

    const fetchSnippets = async () => {
        const myFolder = folder ? folder : '';
        try {
            const response = await Api.get(type === 'favorite' ? '/snippet/favorite/all-favorite' : `/snippet/all-snippets${'?folderName=' + myFolder}`);
            if (response.data.success) {
                setSnippets(response.data.data.snippets);
            }
        } catch (err) {
            console.error('Error fetching snippets:', err);
        } finally {
            setLoading(false);
        }
    };


    return (
        <SnippetsGrid snippets={snippets} loading={loading} />
    )
}
