import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../contexts/AuthContext";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";

const defaultTheme = createTheme();

export default function Authentication() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [bgImage] = React.useState(
   `https://picsum.photos/1600/1000?random=${Math.random()}`
);

  const [formState, setFormState] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  let handleAuth = async () => {
    try {
      if (formState === 0) {
        await handleLogin(username, password);
        setError("");
      }
      if (formState === 1) {
        let result = await handleRegister(name, username, password);
        console.log(result);
        setUsername("");
        setMessage(result);
        setOpen(true);
        setError("");
        setFormState(0);
        setPassword("");
      }

      // console.log("RESULT:", result);
    } catch (err) {
      let message = err.response.data.message;
      setError(message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }} columns={12}>
        <CssBaseline />

        {/* Left side background */}
        <Grid
          size={{ xs: 0, sm: 4, md: 7 }}  
          sx={{
            backgroundImage: `url(${bgImage})`, // must be in public/
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Right side form */}
        <Grid size={{ xs: 12, sm: 8, md: 5 }}>
          <Paper elevation={0} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>

              <div>
                <Button
                  variant={formState === 0 ? "contained" : "text"}
                  onClick={() => setFormState(0)}
                >
                  Sign In
                </Button>

                <Button
                  variant={formState === 1 ? "contained" : "text"}
                  onClick={() => setFormState(1)}
                >
                  Sign Up
                </Button>
              </div>

              <Box component="form" noValidate sx={{ mt: 1 }}>
                {formState === 1 ? (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="fullname"
                    label="Fullname"
                    name="username"
                    value={name}
                    autoComplete="username"
                    autoFocus
                    onChange={(e) => setName(e.target.value)}
                  />
                ) : (
                  <></>
                )}

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  value={username}
                  autoComplete="username"
                  autoFocus
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  type="password"
                  id="password"
                  label="Password"
                  name="password"
                  value={password}
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                />

                <p style={{ color: "red" }}>{error}</p>

                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleAuth}
                >
                  {/* {" "} */}
                  {formState === 0 ? "Login" : "Register"}
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar open={open} autoHideDuration={4000} message={message} />
    </ThemeProvider>
  );
}
