import './App.css';
import React, { useState , useEffect} from 'react';
import axios from 'axios';

function App() {
    interface Employee {
        Id: number;
        FirstName: string;
        LastName: string;
        Email: string;
        Mobile: string;
    }

    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [employeeId, setEmployeeId] = useState("");

    const url = 'https://localhost:44351/api/Employee/';
    const clear = () => {
        setFirstname("");
        setLastname("");
        setEmail("");
        setMobile("");
    }
    const getEmployees = () => {
        axios.get(`${url}GetEmployee`)
            .then((response) => {
                setEmployees(response.data.ListEmployees);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const handleDelete = (id: number) => {
        const data = {
            Id: id,
            Type: "Delete"
        };
        if (id > 0) {
            axios.post(`${url}AddEmployee/`, data)
                .then((response) => {
                    alert(JSON.stringify(response.data.ResponseMessage));
                    clear();
                    getEmployees();
                })
                .catch((error) => {
                    console.error("Error in deleting employee record:", error);
                });
        }
    }

    const handleEdit = (id: any) => {
        const data = {
            Id: id,
        };
        setEmployeeId(id);
        if (id > 0) {
            axios.post(`${url}EmployeeById/`, data)
                .then((response) => {
                    setFirstname(response.data.Employee.FirstName);
                    setLastname(response.data.Employee.LastName);
                    setEmail(response.data.Employee.Email);
                    setMobile(response.data.Employee.Mobile);
                })
                .catch((error) => {
                    console.error("Error in updating employee record:", error);
                });
        }
    }

    useEffect(() => {
        getEmployees();
    },[])

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const data = {
            FirstName: firstName,
            LastName: lastName,
            Mobile: mobile,
            Email: email,
            Type: "Add"
        };

        axios.post(`${url}AddEmployee/`, data)
            .then((response) => {
                alert(JSON.stringify(response.data.ResponseMessage));
                clear();
                getEmployees();
            })
            .catch((error) => {
                console.error("Error submitting data:", error);
            });
    };

    const handleUpdate = (e: any) => {
        e.preventDefault();

        const data = {
            Id: employeeId,
            FirstName: firstName,
            LastName: lastName,
            Mobile: mobile,
            Email: email,
            Type: "Update"
        };

        axios.post(`${url}AddEmployee/`, data)
            .then((response) => {
                alert(JSON.stringify(response.data.ResponseMessage));
                clear();
                getEmployees();
            })
            .catch((error) => {
                console.error("Error submitting data:", error);
            });
    };

    const tableStyles: {
        table: React.CSSProperties;
        th: React.CSSProperties;
        td: React.CSSProperties;
        evenRow: React.CSSProperties;
    } = {
        table: {
            borderCollapse: 'collapse',
            width: '100%',
            fontFamily: 'Arial, sans-serif'
        },
        th: {
            backgroundColor: 'orange',
            color: 'white',
            border: '1px solid #ccc',
            padding: '8px',
            textAlign: 'left'
        },
        td: {
            border: '1px solid #ccc',
            padding: '8px',
            textAlign: 'left'
        },
        evenRow: {
            backgroundColor: '#f2f2f2'
        }
    };

    return (
        <>
            <h1>Employee</h1>
            <div style={{ margin: "0 auto", marginLeft:"10px" }}>
                <label>First Name: </label>
                <input type="text" value={firstName} placeholder="Enter First Name" onChange={(e) => setFirstname(e.target.value)} />
                <br></br>
                <label>Last Name: </label>
                <input type="text" value={lastName} placeholder="Enter Last Name" onChange={(e) => setLastname(e.target.value)} />
                <br></br>
                <label>Email: </label>
                <input type="text" value={email} placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />
                <br></br>
                <label>Mobile: </label>
                <input type="text" value={mobile} placeholder="Enter Mobile Number" onChange={(e) => setMobile(e.target.value)} />
                <br></br>
                <button onClick={(e) => handleSubmit(e)}>Submit</button>
                &nbsp;&nbsp;
                <button onClick={(e) => handleUpdate(e)}>Update</button>
            </div>
            <br />
            <table style={tableStyles.table}>
                <thead>
                    <tr>
                        <th style={tableStyles.th}>Sr. No</th>
                        <th style={tableStyles.th}>First Name</th>
                        <th style={tableStyles.th}>Last Name</th>
                        <th style={tableStyles.th}>Email</th>
                        <th style={tableStyles.th}>Mobile No</th>
                        <th colSpan={2} style={tableStyles.th}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees && employees.map((emp, index) => {
                            return (
                                <tr key={index} style={index % 2 === 0 ? tableStyles.evenRow : undefined}>
                                    <td style={tableStyles.td}>{index + 1}</td>
                                    <td style={tableStyles.td}>{emp.FirstName}</td>
                                    <td style={tableStyles.td}>{emp.LastName}</td>
                                    <td style={tableStyles.td}>{emp.Email}</td>
                                    <td style={tableStyles.td}>{emp.Mobile}</td>
                                    <td style={tableStyles.td}>
                                        <button onClick={() => handleEdit(emp.Id)}>
                                            Edit
                                        </button>
                                    </td>
                                    <td style={tableStyles.td}>
                                        <button onClick={() => handleDelete(emp.Id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )

                        })
                    }
                </tbody>
            </table>
      </>
  );
}

export default App;
