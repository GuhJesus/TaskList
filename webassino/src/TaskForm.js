import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        sla: '',
        file: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            file: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('sla', formData.sla);
            formDataToSend.append('file', formData.file);

            await axios.post('http://localhost:3001/api/tasks', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert('Tarefa cadastrada com sucesso!');
        } catch (error) {
            console.error('Erro ao cadastrar tarefa:', error);
            alert('Erro ao cadastrar tarefa. Verifique o console para mais detalhes.');
        }
    };

    return (
        <div>
            <h2>Cadastrar Tarefa</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Título:</label>
                    <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>SLA (em horas corridas):</label>
                    <input type="number" name="sla" value={formData.sla} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Upload de Arquivo:</label>
                    <input type="file" name="file" onChange={handleFileChange} required />
                </div>
                <button type="submit">Cadastrar Tarefa</button>
            </form>
        </div>
    );
};

export default TaskForm;