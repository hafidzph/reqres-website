import {
  TextField,
  Button,
  CardContent,
  Box,
  Card,
  Modal,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  CircularProgress,
} from "@mui/material";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import { textFieldSx } from "../utils/utils";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function UserForm({ open, handleClose, user, onSubmit }) {
  const [formData, setFormData] = useState(
    user || {
      first_name: "",
      last_name: "",
      email: "",
      job: "Others",
      avatar: "https://i.pravatar.cc/150",
    }
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        job: user.job || "Others",
        avatar: user.avatar,
      });
    } else {
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        job: "Others",
        avatar: "https://i.pravatar.cc/150",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (user) {
      onSubmit(formData);
      setIsLoading(false);
    } else {
      try {
        const res = await fetch("https://reqres.in/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          const newUser = await res.json();
          onSubmit(newUser);
          toast.success("User berhasil ditambahkan!");
        } else {
          toast.error("Gagal menambahkan user.");
        }
      } catch (error) {
        console.error("Error add user", error);
        toast.error("Terjadi kesalahan saat menambahkan user.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: 700,
        }}
      >
        <Card
          elevation={3}
          sx={{
            borderRadius: "12px",
            backgroundColor: "#1E1E1E",
            color: "#E0E0E0",
            position: "relative",
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "#E0E0E0",
            }}
          >
            <CloseIcon />
          </IconButton>

          <CardContent sx={{ padding: 4 }}>
            <h1 className="text-center text-3xl font-semibold text-white mb-10">
              {user ? "Edit User" : "Add User"}
            </h1>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                label="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                variant="outlined"
                sx={textFieldSx}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                variant="outlined"
                sx={textFieldSx}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                sx={textFieldSx}
              />
              <FormControl fullWidth margin="normal" sx={{ color: "#E0E0E0" }}>
                <Select
                  name="job"
                  value={formData.job}
                  onChange={handleChange}
                  sx={{
                    color: "#E0E0E0",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#E0E0E0",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#03DAC6",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#03DAC6",
                    },
                  }}
                >
                  <MenuItem value="Web Developer">Web Developer</MenuItem>
                  <MenuItem value="Mobile Developer">Mobile Developer</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                </Select>
              </FormControl>
              <Button
                type="submit"
                disabled={isLoading}
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  marginTop: 2,
                  backgroundColor: "#03DAC6",
                  color: "#010101",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#018786",
                  },
                  padding: "12px 0",
                }}
              >
                {isLoading ? (
                  <CircularProgress size={24} sx={{ color: "#010101" }} />
                ) : (
                  "Simpan"
                )}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
}

UserForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  user: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export default UserForm;
