import {
  Avatar,
  Box,
  Card,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";

function UserDetail({ open, handleClose, user }) {
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
          width: 500,
        }}
      >
        <Card
          elevation={3}
          sx={{
            backgroundColor: "#1E1E1E",
            color: "#E0E0E0",
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            overflow: "hidden",
            position: "relative",
            justifyContent: "space-between",
            alignItems: "center",
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
          <Avatar
            src={user?.avatar}
            alt={`${user?.first_name} ${user?.last_name}`}
            sx={{ width: 150, height: 150 }}
          />
          <Typography variant="h5">{`${user?.first_name} ${user?.last_name}`}</Typography>
          <Typography variant="body1">{user?.email}</Typography>
          <Typography variant="body1">{user?.job || "Others"}</Typography>
        </Card>
      </Box>
    </Modal>
  );
}

UserDetail.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default UserDetail;
