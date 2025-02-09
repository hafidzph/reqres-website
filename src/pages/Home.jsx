import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Avatar,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";
import UserForm from "../components/UserForm";
import UserDetail from "../components/UserDetail";

function Home() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://reqres.in/api/users");
      const data = await response.json();
      setUsers(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    const isConfirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus user ini?"
    );
    if (!isConfirmed) return;

    setUsers(users.filter((user) => user.id !== id));
    toast.success("User berhasil dihapus!");
  };

  const handleOpen = (selectedUser = null) => {
    setUser(selectedUser);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUser(null);
  };

  const handleDetailOpen = (user) => {
    setSelectedUser(user);
    setDetailOpen(true);
  };

  const handleDetailClose = () => {
    setDetailOpen(false);
    setSelectedUser(null);
  };

  const handleSubmit = (formData) => {
    if (user) {
      setUsers(
        users.map((data) =>
          data.id === user.id ? { ...data, ...formData } : data
        )
      );
      toast.success("User berhasil diperbarui!");
    } else {
      setUsers((prevUsers) => [...prevUsers, formData]);
    }
    handleClose();
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <section className="bg-[#121212] h-screen px-52 justify-center flex flex-col gap-8 py-10">
      <h1 className="text-white text-4xl text-center font-semibold">
        List Users
      </h1>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => handleOpen()}
        sx={{
          marginTop: 2,
          backgroundColor: "#03DAC6",
          color: "#000000",
          fontWeight: "semi-bold",
          "&:hover": {
            backgroundColor: "#018786",
          },
          width: "8.5rem",
          padding: "12px 0",
        }}
      >
        Add User
      </Button>
      {users.length === 0 ? (
        <span className="text-white text-center text-2xl">
          Tidak ada data user
        </span>
      ) : (
        <TableContainer
          component={Paper}
          style={{ backgroundColor: "#1E1E1E" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Avatar
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Name
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Email
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Job
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  style={{ "&:hover": { backgroundColor: "#2C2C2C" } }}
                >
                  <TableCell>
                    <Avatar
                      src={user.avatar}
                      alt={`${user.first_name} ${user.last_name}`}
                    />
                  </TableCell>
                  <TableCell
                    style={{ color: "#E0E0E0" }}
                  >{`${user.first_name} ${user.last_name}`}</TableCell>
                  <TableCell style={{ color: "#E0E0E0" }}>
                    {user.email}
                  </TableCell>
                  <TableCell style={{ color: "#E0E0E0" }}>
                    {user.job ? user.job : "Others"}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleDetailOpen(user)}
                      style={{ color: "#4CAF50" }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleOpen(user)}
                      style={{ color: "#BB86FC" }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(user.id)}
                      style={{ color: "#CF6679" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <UserForm
        open={open}
        handleClose={handleClose}
        onSubmit={handleSubmit}
        user={user}
      />

      <UserDetail
        open={detailOpen}
        handleClose={handleDetailClose}
        user={selectedUser}
      />
    </section>
  );
}

export default Home;
