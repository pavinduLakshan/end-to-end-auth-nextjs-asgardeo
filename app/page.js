// app/page.js
"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
    const [cats, setCats] = useState([]);
    const [name, setName] = useState('');
    const [updateName, setUpdateName] = useState('');
    const [updateId, setUpdateId] = useState(null);

    useEffect(() => {
        fetchCats();
    }, []);

    const fetchCats = async () => {
        const res = await axios.get('/api/cats');
        setCats(res.data);
    };

    const addCat = async () => {
        if (name) {
            const res = await axios.post('/api/cats', { name });
            setCats([...cats, res.data]);
            setName('');
        }
    };

    const updateCat = async () => {
        if (updateId && updateName) {
            const res = await axios.put('/api/cats', { id: updateId, newName: updateName });
            setCats(cats.map(cat => cat.id === updateId ? res.data : cat));
            setUpdateName('');
            setUpdateId(null);
        }
    };

    const deleteCat = async (id) => {
        await axios.delete('/api/cats', { data: { deleteId: id } });
        setCats(cats.filter(cat => cat.id !== id));
    };

    return (
        <div>
            <h1>Cat List</h1>
            <input
                type="text"
                placeholder="Cat Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button onClick={addCat}>Add Cat</button>
            <ul>
                {cats.map(cat => (
                    <li key={cat.id}>
                        {cat.name}
                        <button onClick={() => { setUpdateId(cat.id); setUpdateName(cat.name); }}>Update</button>
                        <button onClick={() => deleteCat(cat.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            {updateId && (
                <div>
                    <input
                        type="text"
                        placeholder="New Name"
                        value={updateName}
                        onChange={(e) => setUpdateName(e.target.value)}
                    />
                    <button onClick={updateCat}>Confirm Update</button>
                </div>
            )}
        </div>
    );
}
