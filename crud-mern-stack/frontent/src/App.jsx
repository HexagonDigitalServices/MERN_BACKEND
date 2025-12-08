import { useEffect, useState } from "react"
import axios from "axios"

const API_BASE = process.env.API_BASE

function App() {
  const [students, setStudents] = useState([])
  const [form, setForm] = useState({ name: "", age: "", course: "" })
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  // fetch all students
  const fetchStudents = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${API_BASE}/students`)
      setStudents(res.data)
      console.log(res.data)
    } catch (err) {
      console.log(err)
      setMessage("Failed to fetch students")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) {
      setMessage("name is required")
      return
    }
    try {
      setLoading(true)
      setMessage("")
      if (editingId) {
        await axios.put(`${API_BASE}/students/${editingId}`, {
          name: form.name, age:
            form.age ? Number(form.age) : undefined,
          course: form.course
        })
        setMessage("student updated successfully")
      } else {
        await axios.post(`${API_BASE}/students`, {
          name: form.name,
          age: form.age ? Number(form.age) : undefined,
          course: form.course
        })
        setMessage("Student created")
      }
      setForm({ name: "", age: "", course: "" })
      setEditingId(null)
      fetchStudents()
    } catch (err) {
      console.log(err)
      setMessage(err.response?.data?.error || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (student) => {
    setEditingId(student._id)
    setForm({
      name: student.name || "",
      age: student.age || "",
      course: student.course || ""
    })
    setMessage("")
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delte this student")) return
    try {
      setLoading(true)
      await axios.delete(`${API_BASE}/students/${id}`)
      setMessage("Student deleted")
      fetchStudents()
    } catch (err) {
      console.log(err)
      setMessage("Failed to delete student")
    } finally {
      setLoading(false)
    }
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setForm({ name: "", age: "", course: "" })
    setMessage("")
  }


  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Student CRUD App</h1>
      <p style={{ marginBottom: 16, color: '#555' }}>Backend: Node + Express +MongoDB | Fronend: React</p>

      <div style={styles.card}>
        <h2 style={{ marginBottom: 12 }}>
          {editingId ? "Edit Student" : "Add New Student"}
        </h2>
        {message && <p>{message}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label>Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter Name"
              required
            />
          </div>
          <div style={styles.field}>
            <label>Age</label>
            <input
              name="age"
              type="Number"
              value={form.age}
              onChange={handleChange}
              placeholder="Enter age"
            />
          </div>
          <div style={styles.field}>
            <label>Course</label>
            <input
              name="course"
              value={form.course}
              onChange={handleChange}
              placeholder="Enter course"
            />
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <button type="submit" disabled={loading} style={styles.buttonPrimary}>
              {editingId ? "Update" : "Create"}
            </button>
            {editingId && (<button type="button" style={styles.buttonSecondary} onClick={handleCancelEdit}>Cancel</button>)}
          </div>
        </form>
      </div>

      <div style={{ ...styles.card, marginTop: 20 }}>
        <h2 style={{ marginBottom: 12 }}>Students Lists</h2>
        {loading && <p>Loading...</p>}
        {!loading && students.length === 0 && <p>No Students found</p>}
        {!loading && students.length > 0 && (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={{ textAlign: "left" }}>Name</th>
                <th style={{ textAlign: "left" }}>Age</th>
                <th style={{ textAlign: "left" }}>Course</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>

              {students.map((s) => (
                <tr key={s._id}>
                  <td style={{ textAlign: "left" }}>{s.name}</td>
                  <td style={{ textAlign: "left" }}>{s.age}</td>
                  <td style={{ textAlign: "left" }}>{s.course}</td>
                  <td style={{ textAlign: "right" }}>
                    <button onClick={() => handleEdit(s)} style={styles.smallButton}>Edit</button>
                    <button onClick={() => handleDelete(s._id)} style={{ ...styles.smallButton, background: "red" }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: 900,
    margin: "0 auto",
    padding: 20,
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  },
  title: {
    fontSize: 28,
    marginBottom: 8,
  },
  card: {
    borderRadius: 10,
    padding: 16,
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    background: "white",
  },
  form: {
    display: "grid",
    gap: 10,
    maxWidth: 400,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  buttonPrimary: {
    padding: "8px 14px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
  buttonSecondary: {
    padding: "8px 14px",
    background: "#6b7280",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: 8,
  },
  smallButton: {
    padding: "4px 8px",
    marginLeft: 6,
    background: "#10b981",
    color: "white",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 13,
  },
};


export default App
