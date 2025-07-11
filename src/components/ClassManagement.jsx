import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ added
import "../assets/css/ClassManagement.css";
// import VantaBackground from "./Background";

const initialClasses = [
    { id: 1, name: "Math 101", subject: "Mathematics", teacher: "Mr. Smith", status: "active" },
    { id: 2, name: "History 201", subject: "History", teacher: "Ms. Johnson", status: "inactive" },
];

export default function ClassManagement() {
    const [classes, setClasses] = useState(initialClasses);
    const [formData, setFormData] = useState({ name: "", subject: "", teacher: "", status: "active" });
    const [editId, setEditId] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate(); // ✅ added

    const handleSave = () => {
        if (editId !== null) {
            setClasses(prev =>
                prev.map(c => (c.id === editId ? { ...formData, id: editId } : c))
            );
        } else {
            const newClass = { ...formData, id: Date.now() };
            setClasses(prev => [...prev, newClass]);
        }
        setFormData({ name: "", subject: "", teacher: "", status: "active" });
        setEditId(null);
        setModalOpen(false);
    };

    const handleEdit = (classItem) => {
        setFormData(classItem);
        setEditId(classItem.id);
        setModalOpen(true);
    };

    const handleDelete = (id) => {
        setClasses(prev => prev.filter(c => c.id !== id));
    };

    return (
        <>
            <VantaBackground />
            <div className="class-container">
                <div className="header">
                    <div className="header-left">
                        <button className="back-btn" onClick={() => navigate("/")}>← Back</button>
                        <h1>Class Management</h1>
                    </div>
                    <button className="add-btn" onClick={() => setModalOpen(true)}>Add Class</button>
                </div>

                <div className="class-list">
                    {classes.map((c) => (
                        <div className="class-card" key={c.id}>
                            <h2>{c.name}</h2>
                            <p><strong>Subject:</strong> {c.subject}</p>
                            <p><strong>Teacher:</strong> {c.teacher}</p>
                            <p className={`status ${c.status}`}>{c.status}</p>
                            <div className="actions">
                                <button onClick={() => handleEdit(c)}>Edit</button>
                                <button className="delete" onClick={() => handleDelete(c.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>

                {modalOpen && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <h2>{editId ? "Edit Class" : "Add Class"}</h2>
                            <input
                                type="text"
                                placeholder="Class Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Subject"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Teacher"
                                value={formData.teacher}
                                onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                            />
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                            <div className="modal-actions">
                                <button onClick={handleSave}>{editId ? "Update" : "Save"}</button>
                                <button onClick={() => { setModalOpen(false); setEditId(null); }}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}